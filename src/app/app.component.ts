import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  products = [
    {name: 'Product 1',
      price: '12',
      info: 'info',
      town: 'Cherkassy',
      user: 'J.D.',
      category: 'c1'
    },
    {name: 'Product 2',
      price: '2',
      info: 'smth',
      town: 'Cherkassy',
      user: 'J.D.',
      category: 'c2'
    }
  ];
  users = [
    { firstName: 'J. D.',
      lastName: 'Dorian',
      email: 'j.d.eagle@gmail.com',
      city: 'Fremont',
      numberOfLots: 3,
      totalAmount: 123
    },
    { firstName: 'Eliot',
      lastName: 'Reid',
      email: 'eleot.reid@gmail.com',
      city: 'Fremont',
      numberOfLots: 3,
      totalAmount: 123
    }
  ];
}
