import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/from';

import { UserService } from '../user.service';
import { User } from '../user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  currentUser: User;

  constructor( private userService: UserService ) {
    userService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }
}
