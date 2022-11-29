import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from 'src/app/interfaces/purchase.interface';
import { Shop } from 'src/app/interfaces/shop.interface';
import { TableOrder } from 'src/app/interfaces/tableOrder.interface';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private readonly app = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  getShopList(): Observable<Shop[] | undefined> {
    return this.http.get<Shop[]>(
      this.app+'/shop');
  }

  //create a Purchase entity, but with isValid=false. 
  //This will later change with the submitOrder to activate the QR Code.
  postPurchase(form: Purchase): Observable<Purchase | undefined> {
    return this.http.post<Purchase>(this.app+'/purchases/new', form);
  }

  postTableOrder(form: TableOrder): Observable<TableOrder | undefined> {
    return this.http.post<TableOrder>(this.app+'/table-order/new', form);
  }

  //purchase becomes valid with PATCH call.
  validPurchase(form: any): Observable<Purchase | undefined> {
    return this.http.patch<Purchase>(this.app+'/purchases/validate', form);
  }

  //Final step before QR code.
  //isValid becomes true. Then QR will be generated. PUT call.
  getUsersPurchase(id: string): Observable<Purchase | undefined> {
    return this.http.get<Purchase>(this.app+`/purchases/${id}`);
  }
}
