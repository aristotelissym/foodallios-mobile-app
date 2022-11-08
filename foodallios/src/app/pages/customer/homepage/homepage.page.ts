import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
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
  message = "Hello, World!";
  shopList: Shop[];

  constructor(private service: HomepageService) { }

  ngOnInit() {
    console.log("hi")
    this.service.getShopList().subscribe(
      shopList => { this.shopList = shopList; console.log(shopList)},
      (err) => { throw new Error(err)  },
      () => {}
      )

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if(ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}`;
    }
  }
}
