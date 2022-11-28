import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly app = 'http://localhost:3000'

  constructor(
    private http: HttpClient,
  ) { }

  login(form: Login): Observable<any> {
    return  this.http.post(this.app+'/auth/login', form)
    
  }
}
