import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
  static hasSpecialChar(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const specialChars = ['!', '@', '#', '$', '%'];
      const value: string = control.value;
      if (!value) {
        return null;
      }

      const hasSpecialChars = specialChars.some((char) => value.includes(char));

      if (hasSpecialChars) {
        return { hasSpecialChar: true };
      } else {
        null;
      }
    };
  }

  static fieldsMustMatch(field1, field2): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const field1Control = control.get(field1);
      const field2Control = control.get(field2);

      if (field1Control.value != field2Control.value) {
        return { fieldsMustMatch: { field1, field2 } };
      }

      return null;
    };
  }
}
