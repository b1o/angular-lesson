import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import {
  FormControl,
  Validators,
  FormGroup,
  ValidatorFn,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { CustomValidators } from 'src/CustomValidators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  // public email = new FormControl('', [Validators.required, Validators.email]);
  // public password = new FormControl('', [Validators.required]);

  // public form = new FormGroup({
  //   email: new FormControl('mail@mail.com', [
  //     Validators.required,
  //     Validators.email,
  //   ]),

  //   password: new FormControl('123', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     hasSpecialChar(),
  //   ]),
  // });

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

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.hasSpecialChar(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [
          CustomValidators.fieldsMustMatch('password', 'confirmPassword'),
          CustomValidators.fieldsMustMatch('email', 'confirmEmail'),
        ],
      }
    );

    this.form.valueChanges.subscribe((value) =>
      console.log(this.password.errors, this.confirmPassword.errors)
    );
  }

  ngOnInit(): void {}

  public getFormErrorMessages() {
    if (this.form.hasError('fieldsMustMatch')) {
      const error = this.form.getError('fieldsMustMatch');
      return `${error.field1} and ${error.field2} fields should match`;
    }
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
    } else if (this.password.hasError('passwordMatch')) {
      return 'passwords must match';
    }
  }

  public checkChanges() {
    if (this.form.dirty) {
      confirm('You have unsaved changes do you wish to continue');
    }
  }

  public onLogin() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log(this.password.errors, this.password.value);
    }
  }
}
