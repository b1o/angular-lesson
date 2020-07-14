import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {hasSpecialChar} from "../../validators/hasSpecialChars";
import {ConfirmPwMatches} from "../../validators/confirmPwMatches";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  public form: FormGroup;
  //public confirmPwForm: FormGroup;
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

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
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
    }, {validator: ConfirmPwMatches(this.password.value, this.confirmPassword.value)} );
    console.log(this.form)
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
      return 'no special chars allowed';
    }
  }

  getConfirmPasswordErrorMessages() {
    if (this.password.hasError('required')) {
      return 'this field is required';
    } else if (this.password.hasError('minlength')) {
      const error = this.password.getError('minlength');
      return `minimum required length is ${error.requiredLength}`;
    } else if (this.password.hasError('hasSpecialChar')) {
      return 'no special chars allowed';
    }
  }

  public onRegister() {
    if (this.form.valid) { // possibly add (this.confirmPwForm.ConfirmPwMatches)...
      this.authService.register(this.form.value);
    }
  }

}
