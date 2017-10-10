import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActiveUser } from '../active-user';
import { User } from '../../user.model';
import {ActivatedRoute} from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [ActiveUser]
})
export class UserDetailComponent implements OnInit {
  user;
  id;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['userId'];
    });
    this.user = this.userService.getContactById(this.id);
  console.log(this.user);
    // this.activeUser.user.subscribe(user => this.user = user);
  }
}
