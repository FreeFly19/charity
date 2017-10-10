import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


interface User {
  displayName: string;
  email: string;
  password: string;
  city: string;
  balance: number;
  numProducts: number;
}

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
  userDisplayName;
  userEmail;
  userPassword;
  userCity;

  addUser() {
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
  }
}
