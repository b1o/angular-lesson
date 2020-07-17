import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {hasSpecialChar} from '../../login/login-page/login-page.component';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public form: FormGroup;
  public error: string;

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  public get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public get username() {
    return this.form.get('username');
  }

  public get city() {
    return this.form.get('address.city');
  }

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [Validators.required, Validators.minLength(3), hasSpecialChar()],
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(3), hasSpecialChar()],
      ],
      address: this.fb.group({
        city: ['', [Validators.required]],
        zipCode: '',
        street: '',
        streetNumber: '',
      }),
    });

    this.form.valueChanges.subscribe((status) => console.log(status));
  }

  ngOnInit(): void {
  }

  public getEmailErrorMessages() {
    if (this.email.hasError('required')) {
      return 'this field is required';
    } else if (this.email.hasError('email')) {
      return 'please enter a valid email address';
    }
  }

  public getPasswordErrorMessages() {
    if (this.password.hasError('required')) {
      return 'this field is required';
    } else if (this.password.hasError('minlength')) {
      const error = this.password.getError('minlength');
      return `minimum required length is ${error.requiredLength}`;
    } else if (this.password.hasError('hasSpecialChar')) {
      return 'no special char included';
    }
  }

  public getPasswordsMissmatchMessage() {
    if (this.password != this.confirmPassword){
      return 'passwords missmatch';
    }
    else {
      return null;
    }
  }

  public getUsernameErrorMessages() {
    if (this.username.hasError('required')){
      return 'this field is required';
    }
    else if (this.username.hasError('minlength')){
      const error = this.username.getError('minlength');
      return `minimum required length is ${error.requiredLength}`;
    }
  }

  public getCityErrorMessages() {
    if (this.city.hasError('required')){
      return 'this field is required';
    }
  }

  public checkChanges() {
    if (this.form.dirty) {
      confirm('You have unsaved changes do you wish to continue');
    }
  }

  public onRegister(){
    // this.authService.register(this.email, this.password);
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.register(this.form.value);
    } else {
      console.log(this.password.errors, this.password.value);
    }
  }
}

