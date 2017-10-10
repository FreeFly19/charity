import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { Product } from '../product';

var pipeFilter;
pipeFilter;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})

export class ProductsListComponent {
  pipeFilter: any;
  productList: FirebaseListObservable<Product[]>;

  constructor(private db: AngularFireDatabase) {
    this.productList = db.list('/products');
    this.productList.subscribe(products => this.products = products);
  }

  products: Product[] = [];

  setCategory = [
    '',
    'Техника',
    'Мебель',
    'Одежда',
    'Игрушки',
  ];

  productName;
  productDesc;
  productPrice;
  productCity;
  selCat = this.setCategory[0];

  addProduct() {
    this.productList.push({
      name: this.productName,
      description: this.productDesc,
      price: this.productPrice,
      city: this.productCity,
      category: this.selCat,
      time: new Date().getTime()
    });
    this.productName = '';
    this.productDesc = '';
    this.productPrice = '';
    this.productCity = '';
    this.selCat = this.setCategory[0];
  }
}
