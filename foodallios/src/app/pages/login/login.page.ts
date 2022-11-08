import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Login } from 'src/app/interfaces/login.interface';
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
    private toastController: ToastController,
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
    user => { this.user = user; },
    () => { this.presentToast('bottom', 'Invalid username or password!', 'global', 'danger') },
    () => { this.router.navigate(['/homepage'])}
    )

  }

  async presentToast(position: 'top' | 'middle' | 'bottom', err: string, ic: string, color: string) {
    const toast = await this.toastController.create({
      message: err,
      duration: 1500,
      position: position,
      animated: true,
      color: color,
      icon: ic
    })

    await toast.present();
  }

}
