import { Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {FirebaseListObservable} from 'angularfire2/database';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: Observable<firebase.User>;
  userDisplayName;
  userEmail;
  userPassword;
  userCity;
  userList: FirebaseListObservable<User[]>;
  userName;
  userSurname;
  addUserPanel;

  constructor(public afAuth: AngularFireAuth, private userService: UserService) {
    this.user = afAuth.authState;
  }
  loginWithGoogle() {
    this.userService.signIn();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  login() {
    this.userList.push({
      displayName: this.userDisplayName,
      email: this.userEmail,
      password: this.userPassword,
      city: this.userCity
    });
    this.userDisplayName = '';
    this.userEmail = '';
    this.userPassword = '';
    this.userCity = '';
    (this.userService.navigateTo('/dashboard/welcome'));
  }

  addUser() {
    this.addUserPanel = !this.addUserPanel;
  }

}
