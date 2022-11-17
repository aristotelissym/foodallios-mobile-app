import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { Shop } from 'src/app/interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopProductListService {

  private readonly app = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  getShopDetails(id: string): Observable<Shop | undefined> {
    return this.http.get<Shop>(this.app+`/shop/${id}`);
  }

  getShopProductList(id: string): Observable<Product[] | undefined> {
    return this.http.get<Product[]>(this.app+`/shop/${id}/product-list`);
  }

  getShopProductDetails(shopId: string, productId: string): Observable<Product | undefined> {
    return this.http.get<Product>(this.app+`/shop/${shopId}/product-list/${productId}`);
  }
}
