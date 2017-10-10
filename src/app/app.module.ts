import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import {AppComponent} from './app.component';
import {UserListComponent} from './users/users-list/user-list.component';
import {ProductsListComponent} from './products/products-list/products-list.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {FilterArrayPipe} from './users/users-list/user-filter.pipe';
import {FilterProducts} from './products/products-list/product-filter.pipe';
import {AuthService} from './auth/auth.service';
import {AngularFireAuth} from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import {UserService} from './user.service';
import {AuthGuard} from './login/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {WelcomeComponent} from './dashboard/welcome.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDbsw7ifwF99TPx5wF0-gKB7iKoRynaFAU',
  authDomain: 'give-up-for-charity.firebaseapp.com',
  databaseURL: 'https://give-up-for-charity.firebaseio.com',
  storageBucket: 'give-up-for-charity.appspot.com',
  messagingSenderId: '475835778471'
};


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'lot-list', component: ProductsListComponent },
      { path: 'lot-list/:id', component: ProductDetailComponent },
      { path: ':id', component: UserDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ProductsListComponent,
    LoginComponent,
    ProductDetailComponent,
    FilterArrayPipe,
    FilterProducts,
    DashboardComponent,
    WelcomeComponent,
    UserDetailComponent

  ],
  imports: [
    InfiniteScrollModule,
    BrowserModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes, { useHash: true }),

  ],
  providers: [AuthService, AngularFireAuth, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
