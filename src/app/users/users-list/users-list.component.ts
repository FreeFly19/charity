import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {

  @Input() users;
  select = new EventEmitter();
  selectedUser: any;
  filterText = '';

  selectUser(user) {
    this.selectedUser = user;
    this.select.emit(user);
  }

}
