import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

import { Product } from '../product';
import {UploadService} from './uploads/upload.service';
import {Upload} from './uploads/upload';

var pipeFilter;
pipeFilter;

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [UploadService]
})

export class ProductsListComponent {
  pipeFilter: any;
  productList: FirebaseListObservable<Product[]>;
  selectedFiles: FileList;

  constructor(private db: AngularFireDatabase,
              public upSvc: UploadService) {
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
  newProductId: string;

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  uploadPhoto() {
    let file = this.selectedFiles.item(0);
    this.upSvc.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.upSvc.currentUpload);
  }

  addProduct() {
    this.newProductId = this.productList.push({
      photo: {
        name: '',
        url: ''
      },
      name: this.productName,
      description: this.productDesc,
      price: this.productPrice,
      city: this.productCity,
      category: this.selCat,
      time: new Date().getTime()
    }).key;
    this.upSvc.saveFileData(this.newProductId);
    this.productName = '';
    this.productDesc = '';
    this.productPrice = '';
    this.productCity = '';
    this.selCat = this.setCategory[0];
  }
}
