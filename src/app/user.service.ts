import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import {User} from './user.model';


@Injectable()
export class UserService {
  readonly currentUser: Subject<User> = new BehaviorSubject<User>(undefined);

  constructor(private afAuth: AngularFireAuth,
              public afDatabase: AngularFireDatabase,
              private router: Router) {
    afAuth.authState
      .flatMap(user => user ? this.getById(UserService.emailToId(user.email)) : Observable.of(null))
      .subscribe(this.currentUser);
  }
  id;
  user;

  signIn(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(authInfo => authInfo.user)
      .then(user => this.update(user))
      .then(user => this.currentUser.next(user))
      .then(this.navigateTo('/dashboard/welcome'));
  }

  signOut(): void {
    this.afAuth.auth.signOut()
      .then(this.navigateTo('/login'));
  }

  update(afUser: any): firebase.Promise<User> {
    const user = {
      id: UserService.emailToId(afUser.email),
      displayName: afUser.displayName,
      email: afUser.email,
      city: afUser.city
    };

    return this.afDatabase
      .object(`/users/${user.id}`)
      .update({displayName: user.displayName, email: afUser.email})
      .then(() => user);
  }

  getById(userId: string): Observable<User> {
    return this.afDatabase
      .object(`/users/${userId}`)
      .map(UserService.toUserFromUserSnapshot);
  }

  static emailToId(email: string): string {
    return email.replace(/\./g, 'DOT').replace('@', 'AT');
  }

  static toUserFromUserSnapshot(userSnapshot): User {
    return {
      id: userSnapshot.$key,
      displayName: userSnapshot.displayName,
      email: userSnapshot.$key.replace('DOT', '.').replace('AT', '@'),
      // city: '',
      // balance: 0
    };
  }

  navigateTo(path) {
    return () => this.router.navigate([path]);
  }
}
