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
    user => { this.user = user; sessionStorage.setItem('username', this.loginForm.value.username) },
    () => { this.shared.presentToast('bottom', 'Invalid username or password!', 'global', 'danger') },
    () => { this.router.navigate(['/homepage'])}
    )

  }

}
