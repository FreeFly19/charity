import {Component,  OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {BidService} from './bid.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [BidService]
})

export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public bidService: BidService) {
  }

  text: string;
  data;
  private tomorrow: Date;

  ngOnInit() {
    setInterval(() => {
      this.tomorrow = new Date(1506062336529);
      this.tomorrow.setDate(this.tomorrow.getDate() + 1);
      let now = new Date().getTime();
      let timeSpace = this.tomorrow.getTime() - now;
      let hours = Math.floor((timeSpace % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeSpace % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeSpace % (1000 * 60)) / 1000);

      if (this.tomorrow.getTime() <= now) {
        this.text = 'lot is sold';
        return this.data = true;
      } else {
        console.log(this.tomorrow);
        console.log(now);
        this.text = `${hours}:${minutes}:${seconds}`;
        return this.data = false;
      }
    }, 1000);

    this.route.paramMap
      .map(paramMap => paramMap.get('id'))
      .do(id => this.bidService.id = id)
      .switchMap(id => this.bidService.db.object(`/products/${id}`)).subscribe(product => {
      this.bidService.product = product;
      this.bidService.newBid = this.bidService.product.price;
    });
  }
}
