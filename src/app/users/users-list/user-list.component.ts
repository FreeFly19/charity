import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


interface User {
  name: string;
  surname: string;
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
    db.list('/users');
    this.userList = db.list('/users');
    this.userList.subscribe(users => this.users = users);
  }
  userList: FirebaseListObservable<User[]>;
  filterText:any;

  users: User[] = [];
  userName;
  userSurname;
  userEmail;
  userPassword;
  userCity;

  addUser() {
    this.userList.push({
      name: this.userName,
      surname: this.userSurname,
      email: this.userEmail,
      password: this.userPassword,
      city: this.userCity
    });
    this.userName = '';
    this.userSurname = '';
    this.userEmail = '';
    this.userPassword = '';
    this.userCity = '';
  }

}
