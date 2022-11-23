import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login.interface';
import { SharedFuns } from 'src/app/shared/shared';
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

  constructor(
    public fb: FormBuilder,
    private service: LoginService,
    private shared: SharedFuns,
    private router: Router
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
        this.user = user; sessionStorage.setItem('username', this.loginForm.value.username); 
        sessionStorage.setItem('productCart', JSON.stringify([])); 
        sessionStorage.setItem('customerId', 'd90bd85c-e7f1-4867-a85f-088602ce20d9');
        sessionStorage.setItem('purchaseId', 'a089edbc-fcf5-4ed7-a0b4-019817977420');
      },
      () => { this.shared.presentToast('bottom', 'Invalid username or password!', 'global', 'danger') },
      () => { this.router.navigate(['/homepage']) }
    )

  }

}
