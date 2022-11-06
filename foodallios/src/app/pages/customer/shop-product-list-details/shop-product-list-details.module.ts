import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopProductListDetailsPageRoutingModule } from './shop-product-list-details-routing.module';

import { ShopProductListDetailsPage } from './shop-product-list-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopProductListDetailsPageRoutingModule
  ],
  declarations: [ShopProductListDetailsPage]
})
export class ShopProductListDetailsPageModule {}
