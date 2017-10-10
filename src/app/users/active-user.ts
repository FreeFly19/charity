import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { User } from '../user.model';
import { UserService } from '../user.service';

@Injectable()
export class ActiveUser {
  user: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    // this.user = this.route.paramMap
    //   .map(paramMap => paramMap.get('userId'))
    //   .switchMap(userId => this.userService.getContactById(userId));

  }

}
