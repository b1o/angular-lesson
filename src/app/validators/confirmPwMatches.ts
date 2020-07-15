import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ConfirmPwMatches(filed1Name, field2Name): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const field1Control = control.get(filed1Name);
    const field2Control = control.get(field2Name);

    if (field1Control.value !== field2Control.value) {
      return { ConfirmPwMatches: true };
    } else {
      null;
    }
  };
}
