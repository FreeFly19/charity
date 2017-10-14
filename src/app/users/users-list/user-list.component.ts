import { Component } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UserListComponent {

  constructor(private db: AngularFireDatabase) {
    this.userList = db.list('/users');
    this.userList.subscribe(users => this.users = users);
  }
  userList: FirebaseListObservable<User[]>;
  filterText: any;

  users: User[] = [];

}
