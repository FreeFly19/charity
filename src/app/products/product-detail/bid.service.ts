import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'rxjs/add/operator/switchMap';

import { Product } from '../product';
import {UserService} from '../../user.service';
import { Bid, BidProduct, BidUser } from './bid';
import { User } from '../../user.model';

@Injectable()
export class BidService {

  bidList: FirebaseListObservable<Bid[]>;
  bidProductList: FirebaseListObservable<BidProduct[]>;
  bidUserList: FirebaseListObservable<BidUser[]>;
  constructor( public db: AngularFireDatabase,
               private userService: UserService) {
    userService.currentUser.subscribe(
      currentUser => this.currentUser = currentUser);
    this.bidList = db.list('/bids');
    this.bidList.subscribe(bids => this.bids = bids);

    this.bidUserList = this.db.list(`/users/${this.currentUser.id}/bid`);
    this.bidUserList.subscribe(bid => this.bidsUser = bid);
  }

  currentUser: User;
  id;
  newBid: number;
  bids: Bid[] = [];
  bidsProduct: BidProduct[] = [];
  bidsUser: BidUser[] = [];
  bidId;
  product: Product;
  user: User;

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
      this.bidProductList.push({
        bidId: this.bidId,
        newBid: this.newBid,
        user: this.currentUser.id
      });
      this.bidUserList.push({
        bidId: this.bidId,
        newBid: this.newBid,
        product: this.id
      });
    } else {
      alert('ERROR: Your bid < price');
    }
  }
}
