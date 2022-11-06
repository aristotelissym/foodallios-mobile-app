import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopProductListPage } from './shop-product-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShopProductListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopProductListPageRoutingModule {}
