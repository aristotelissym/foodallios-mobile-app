import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shop } from 'src/app/interfaces/shop.interface';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private readonly app = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  getShopList(): Observable<Shop[] | undefined> {
    return this.http.get<Shop[]>(this.app+'/shops');
  }
}
