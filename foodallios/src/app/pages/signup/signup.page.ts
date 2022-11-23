import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUp } from 'src/app/interfaces/signup.interface';
import { Router } from '@angular/router';
import { SharedFuns } from 'src/app/shared/shared';
import { SingupService } from './signup.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpForm: FormGroup;
  isDisabled: boolean = false;
  user: SignUp;

  constructor(
    public fb: FormBuilder,
    private service: SingupService,
    private shared: SharedFuns,
    private router: Router,
    ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]],
      email: [null, [ Validators.required]],
      role: [null, Validators.required],
      createdBy: ['signUpForm', Validators.required],
      createdAt: [formatDate(Date.now(), 'yyyy-MM-dd', 'en'), [Validators.required]]
    });
  }

  onSubmit() {
    this.service.register(this.signUpForm.value).subscribe(
      user => { this.user = user; },
      () => { this.shared.presentToast('bottom', 'User already exists!', 'global', 'danger') },
      () => { this.router.navigate(['/homepage'])}
      )
  }

}
