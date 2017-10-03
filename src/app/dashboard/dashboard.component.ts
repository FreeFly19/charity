import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentUser: User;

  constructor( private userService: UserService,
               public afAuth: AngularFireAuth,
               private router: Router) {
    userService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  login() {
    this.userService.signIn();
  }

  private navigateTo(path) {
    return () => this.router.navigate([path]);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(this.navigateTo('/login'));
  }

}
