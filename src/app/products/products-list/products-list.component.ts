import {Component} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';


var pipeFilter;
pipeFilter;


interface Product {
  name: string;
  description: string;
  price: number;
  city: string;
  category: string;
  time: Date;
}

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  _router: any;
  selectedProduct: Product;
  pipeFilter: any;
  productList: FirebaseListObservable<Product[]>;

  constructor(private db: AngularFireDatabase) {
    db.list('/products');
    this.productList = db.list('/products');
    this.productList.subscribe(products => this.products = products);
  }

  products: Product[] = [];

  setCategory = [
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
  productSelected;

  onSelect(prod: Product): void {
    this.selectedProduct = prod;
    this._router.navigate(['/product', prod.name]);
  }

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
