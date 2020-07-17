import { Component, OnInit } from '@angular/core';
import {DataService} from '../../users/services/data.service';
import {AuthService} from '../../auth.service';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

export function hasSpecialChar(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const specialChars = ['!', '@', '#', '$', '%'];
    const value: string = control.value;
    if (!value) {
      return null;
    }

    const hasSpecialChars = specialChars.some((char) => value.includes(char));

    if (!hasSpecialChars) {
      return { hasSpecialChar: true };
    } else {
      return null;
    }
  };
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public error: string;

  public get email() {
    return this.form.get('email');
  }

  public get password() {
    return this.form.get('password');
  }

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.minLength(3), hasSpecialChar()],
      ]
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

  public checkChanges() {
    if (this.form.dirty) {
      confirm('You have unsaved changes do you wish to continue');
    }
  }

  public onLogin(){
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.login(this.email.value, this.password.value);
    } else {
      console.log(this.password.errors, this.password.value);
    }
  }
}
