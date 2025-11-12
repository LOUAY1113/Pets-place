import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule, RouterModule]
})
export class NavbarComponent {
  isMenuOpen = false;

  // 🔁 Toggle menu open/close
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // 🚪 Close menu when clicking a link (mobile UX)
  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
