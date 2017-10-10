import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { UserService } from '../../../user.service';
import { User } from '../../../user.model';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],

})
export class UserDetailComponent implements OnInit {

  currentUser: User;
  user: User;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public db: AngularFireDatabase) {
    userService.currentUser.subscribe(currentUser => this.currentUser = currentUser);
  }

  id;

  ngOnInit() {
    this.route.paramMap
      .map(paramMap => paramMap.get('id'))
      .do(id => this.id = id)
      .switchMap(id => this.db.object(`/users/${id}`)).subscribe(user => {
      this.user = user;
    });
  }
}
