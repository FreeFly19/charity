import {Component} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  currentUser: User;

  constructor( private userService: UserService) {
    userService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }


  path = `http://localhost:4200/#/dashboard/mariasampirATgmailDOTcom`;
}
