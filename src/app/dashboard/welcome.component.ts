import {Component} from '@angular/core';

@Component({
  selector: 'welcome',
  template: ` <a href="/" id="logo">Choose option</a>
                <ul id="menu">
                  <li> <a routerLink="/dashboard/lot-list"> <span>Show bids</span> </a> </li>
                  <li><a href="/"><span>Show programs</span></a></li>
                </ul>
  `,
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
}
