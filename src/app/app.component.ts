import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../models/product';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { StarComponent } from './star/star.component';
// import { StarComponent } from './star/star.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, DatePipe, StarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'product-app';
  newProductName = new FormControl("");
  filterQ = new FormControl("");
  tableRows: Product[] = this.getProducts(); //from database
  visibleRows: Product[] = this.tableRows;
  imagesAreVisible = false;
  selectedProduct: Product | undefined = undefined;

  constructor() {
    this.filterQ.valueChanges.subscribe((value) => {
      this.refreshVisibleData()
    })
  }
  selectItem(product: Product) {
    this.selectedProduct = product;
  }

  onClickStar(product: Product) {
    console.warn(this.tableRows)
    const rating = product.rating === 5 ? 0 : 5;
    const updatedProduct = { ...product, rating };

    this.tableRows = this.tableRows.map(value => {
      return value === product ? updatedProduct : value
    });
    console.log(this.tableRows)
    this.refreshVisibleData();

  }

  getProducts(): Product[] {
    const namen = ["pikachu", "blastoise", "charmander"]
    const images = ["https://placehold.co/100x100"]
    return namen.map(naam => {
      return makeProduct(naam, images[0], 0.0, 5, new Date(), removeVowels(naam))
    })

  }

  toggleStar(item: Product) {
    const rating = item.rating > 0 ? 0 : 5;
    console.warn("Setting rating", rating)
    this.tableRows = this.tableRows.map((value => {
      return value === item ? { ...item, rating } : value
    }));
    this.refreshVisibleData();
  }
  removeItem(p: Product) {
    this.tableRows = this.tableRows.filter(elem => elem != p);
    this.refreshVisibleData();
  }

  refreshVisibleData() {
    this.visibleRows = this.tableRows.filter(row => row.name.includes(this.filterQ.value || ""));
  }

  addProduct() {
    const productNaam = this.newProductName.value || "geen naam";
    this.tableRows.push(makeProduct(productNaam, "https://placehold.co/100x100", 0.0, 5, new Date(),
      removeVowels(productNaam)));
  }


  toggleImages() {
    this.imagesAreVisible = !this.imagesAreVisible;
  }
}

function makeProduct(name: string, imageUrl: string, price: number, rating: number, available: Date, code: string): Product {
  return { name, imageUrl, price, rating, available, code };
}

function removeVowels(value: string) {
  let result = "";
  for (let i = 0; i < value.length; i++) {
    if (!['a', 'u', 'e', 'i', 'o'].includes(value.charAt(i))) result += value.charAt(i)
  }
  return result;
}