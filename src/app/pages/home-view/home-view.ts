import { Component } from '@angular/core';
import { Feed } from '../feed/feed';

@Component({
  selector: 'hb-home-view',
  imports: [Feed],
  templateUrl: './home-view.html',
  styleUrl: './home-view.scss'
})
export class HomeView {

}
