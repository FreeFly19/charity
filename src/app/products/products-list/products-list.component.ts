import {Component, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  @Input() products;
  select = new EventEmitter();
  productSelected: any;
  pipeFilter = '';
  // changeFilterData:any[] = [];
  // pipeFilterData:any[] =  [];

  isSelected(product): boolean {
    return this.productSelected === product;
  }
  selectProduct(product) {
    this.productSelected = product;
    this.select.emit(product);
  }

}
