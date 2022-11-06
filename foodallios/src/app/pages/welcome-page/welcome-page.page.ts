import { Component, OnInit } from '@angular/core';
import { HomepagePage } from '../customer/homepage/homepage.page';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.page.html',
  styleUrls: ['./welcome-page.page.scss'],
})
export class WelcomePagePage implements OnInit {

  homepageComp = HomepagePage;

  constructor() { }

  ngOnInit() {
  }

}
