// import { Routes } from '@angular/router';

// import { HomeComponent } from './Pages/home/home.component';
// import { AboutComponent } from './Pages/about/about.component';
// import { ContactComponent } from './Pages/contact/contact.component';

// import { LoginComponent } from './Pages/dashboard/login/login.component';
// import { SignupComponent } from './Pages/dashboard/signup/signup.component';
// import { DashboardHomeComponent } from './Pages/dashboard/dashboard-home/dashboard-home.component';

// export const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent },

//   // Dashboard pages
//   { path: 'dashboard/login', component: LoginComponent },
//   { path: 'dashboard/signup', component: SignupComponent },
//   { path: 'dashboard/home', component: DashboardHomeComponent },
// ];

import { Routes } from '@angular/router';

// Layouts
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

// Pages
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { LoginComponent } from './Pages/dashboard/login/login.component';
import { DashboardHomeComponent } from './Pages/dashboard/dashboard-home/dashboard-home.component';

export const routes: Routes = [

  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
    ]
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },

  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardHomeComponent }
    ]
  },

  { path: '**', redirectTo: '' }
];

