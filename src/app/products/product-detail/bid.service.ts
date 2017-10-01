import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'rxjs/add/operator/switchMap';

import { Product } from '../product';
import {UserService} from '../../user.service';
import { Bid } from './bid';
import { User } from '../../user.model';

@Injectable()
export class BidService {

  bidList: FirebaseListObservable<Bid[]>;
  constructor( public db: AngularFireDatabase,
               private userService: UserService) {
    userService.currentUser.subscribe(
      currentUser => this.currentUser = currentUser);
    this.bidList = db.list('/bids');
    this.bidList.subscribe(bids => this.bids = bids);
  }

  currentUser: User;
  id;
  newBid: number;
  bids: Bid[] = [];
  bidId;
  product: Product;

  setNewBid () {
    if (Number(this.product.price) < Number(this.newBid)) {
      console.log(this.db.object(`/products/${this.id}`));
      this.db.object(`/products/${this.id}`).update(
        {price: Number(this.newBid)}
      );
      this.bidId = this.bidList.push({
        productId: this.id,
        userId: this.currentUser.id,
        bid: Number(this.newBid),
        timeStamp: new Date().getTime()
      }).key;
    } else {
      alert('ERROR: Your bid < price');
    }
  }
}
