import {AbstractControl, ValidatorFn} from "@angular/forms";

export function hasSpecialChar(): ValidatorFn {
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
