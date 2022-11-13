import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Shop } from 'src/app/interfaces/shop.interface';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  name: string;
  shopList: Shop[];
  userSession = sessionStorage.getItem('username');

  constructor(
    private service: HomepageService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.service.getShopList().subscribe(
      shopList => { this.shopList = shopList; console.log(shopList) },
      (err) => { throw new Error(err)  },
      () => {}
      )

  }

  moreBtn(shop: Shop) {
    this.route.snapshot.paramMap.get(shop.id)
  }
}
