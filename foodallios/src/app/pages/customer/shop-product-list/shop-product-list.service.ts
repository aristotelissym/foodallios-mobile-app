import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ShopProductListService {

  private readonly app = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  getShopProductList(id: string): Observable<Product[] | undefined> {
    return this.http.get<Product[]>(this.app+`/shop/${id}/product-list`);
  }
}
