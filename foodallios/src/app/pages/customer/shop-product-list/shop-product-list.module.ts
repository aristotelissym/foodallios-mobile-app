import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShopProductListPageRoutingModule } from './shop-product-list-routing.module';

import { ShopProductListPage } from './shop-product-list.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShopProductListPageRoutingModule,
    MaterialModule
  ],
  declarations: [ShopProductListPage]
})
export class ShopProductListPageModule {}
