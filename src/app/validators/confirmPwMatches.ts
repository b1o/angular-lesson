import {AbstractControl, ValidatorFn} from "@angular/forms";

export function ConfirmPwMatches(password, confirmPassword): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {

    if (password === confirmPassword) {
      return { ConfirmPwMatches: true };
    } else {
      null;
    }
  };
}
