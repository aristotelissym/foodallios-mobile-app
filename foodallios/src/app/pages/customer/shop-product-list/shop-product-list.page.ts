import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ShopProductListService } from './shop-product-list.service';

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
  productList: Product[];
  shopId: string;

  constructor(private service: ShopProductListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(data => this.shopId = data.get('id'))
    this.service.getShopProductList(this.shopId).subscribe(
      productList => { this.productList = productList; console.log(productList)},
      err => { throw new Error(err) },
      () => { }
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
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}`;
    }
  }
}
