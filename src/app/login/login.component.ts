import { Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { UserService } from '../user.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private userService: UserService) {
    this.user = afAuth.authState;
  }
  loginWithGoogle() {
    this.userService.signIn();
  }



}
