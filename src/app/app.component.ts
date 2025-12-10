// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   constructor(private router: Router) {}

//   isDashboardRoute() {
//     return this.router.url.startsWith('/dashboard');
//   }
// }

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// standalone imports composants globaux
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent
  ]
})
export class AppComponent {}
