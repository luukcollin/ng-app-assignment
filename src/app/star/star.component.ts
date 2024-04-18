import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [],
  templateUrl: './star-outline.svg',
  styleUrl: './star.component.scss'
})
export class StarComponent {
  @Input() filled: boolean = false;

  @HostBinding("style.fill")
  get bg() {
    return this.filled ? "#F0FF00" : "#000000";
  }
}