import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpForm: FormGroup;
  isDisabled: boolean = false;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required]],
      email: [null, Validators.required],
      role: ['CUSTOMER', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }

}
