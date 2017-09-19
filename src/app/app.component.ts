import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products = [
    {name: 'Product 1',
      startAmount: '12',
      info: 'info',
      town: 'Cherkassy'
  },
    {name: 'Product 2',
      startAmount: '2',
      info: 'smth',
      town: 'Cherkassy'
    }
  ];
}
