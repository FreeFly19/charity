import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

interface Product {
  name: string;
  description: string;
  price: number;
  city: string;
  category: string;
  time: Date;
}


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit {
  text: string;

  constructor(private route: ActivatedRoute, private db: AngularFireDatabase) {
    db.list('/products');
    this.productList = db.list('/products');
    this.productList.subscribe(products => this.products = products);
  }


  id;
  data;

  products: Product[] = [];
  productList: FirebaseListObservable<Product[]>;
  selectedProduct;
  private tomorrow: Date;

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log('id' + this.id);
    });
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
  }

}
