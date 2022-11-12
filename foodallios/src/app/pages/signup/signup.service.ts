import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUp } from 'src/app/interfaces/signup.interface';

@Injectable({
  providedIn: 'root'
})
export class SingupService {

  private readonly app = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  register(form: SignUp): Observable<any> {
    return this.http.post(this.app+'/auth/register', form)
    
  }
}
