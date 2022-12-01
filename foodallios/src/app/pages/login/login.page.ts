import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Login } from 'src/app/interfaces/login.interface';
import { SharedFuns } from 'src/app/shared/shared';
import { Preferences } from '@capacitor/preferences';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isDisabled: boolean = false;
  user: Login;
  customerId: string;

  _tabBool$ = new BehaviorSubject<boolean>(false);
  tabState = this._tabBool$.asObservable();

  constructor(
    public fb: FormBuilder,
    private service: LoginService,
    private shared: SharedFuns,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.service.login(this.loginForm.value).subscribe(
      user => {
        sessionStorage.setItem('BearerTokenItem', `Bearer ${user.access_token}`);
        Preferences.set({
          key: 'BearerTokenItem',
          value: `Bearer ${user.access_token}`
        })

        this.user = user; sessionStorage.setItem('username', this.loginForm.value.username); 
        sessionStorage.setItem('productCart', JSON.stringify([])); 
      },
      () => { 
        this.shared.presentToast('bottom', 'Invalid username or password!', 'danger') 
      },
      () => {
        this.router.navigate(['/homepage']);
        console.log(sessionStorage.getItem('BearerTokenItem')); 
        console.log(sessionStorage.getItem('username')); 

      }
    )

  }

}
