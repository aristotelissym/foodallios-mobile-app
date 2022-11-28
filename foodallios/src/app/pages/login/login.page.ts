import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Login } from 'src/app/interfaces/login.interface';
import { SharedFuns } from 'src/app/shared/shared';
import { StorageService } from 'src/app/shared/storage.service';
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

  _tabBool$ = new BehaviorSubject<boolean>(false);
  tabState = this._tabBool$.asObservable();

  constructor(
    public fb: FormBuilder,
    private service: LoginService,
    private shared: SharedFuns,
    private router: Router,
    private storage: StorageService
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
        console.log(user.access_token)
        this.storage.set('jwt_token', user.access_token)
        console.log(this.storage.get('jwt_token'))
        this.user = user; sessionStorage.setItem('username', this.loginForm.value.username); 
        sessionStorage.setItem('productCart', JSON.stringify([])); 
        sessionStorage.setItem('customerId', 'ba9f26b4-e0f1-4bce-b9ba-f35c6de472e9');
        
        
      },
      () => { 
        this.shared.presentToast('bottom', 'Invalid username or password!', 'global', 'danger') 
      },
      () => { 
        this.router.navigate(['/homepage'])
      }
    )

  }

}
