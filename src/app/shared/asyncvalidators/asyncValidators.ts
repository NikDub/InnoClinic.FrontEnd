import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { IdentityService } from "../services/identity/identity.service";

export function checkEmailInSystemValidator(identityService:IdentityService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return identityService
      .isEmailExists(control.value)
      .pipe(map((result: any) => (result ? { invalidEmail: true } : null)));
  };
}
