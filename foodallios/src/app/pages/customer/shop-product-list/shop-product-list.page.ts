import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-shop-product-list',
  templateUrl: './shop-product-list.page.html',
  styleUrls: ['./shop-product-list.page.scss'],
})
export class ShopProductListPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  name: string;
  shopTitle = "Farina Casa";
  message = "Hello, World!";

  constructor() { }

  ngOnInit() {
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
