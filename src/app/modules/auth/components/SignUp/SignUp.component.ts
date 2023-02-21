import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { checkEmailInSystemValidator } from 'src/app/shared/asyncvalidators/asyncValidators';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  identityService: IdentityService;

  myForm: FormGroup;
  constructor(identityService: IdentityService, public dialog: MatDialog, private route: Router) {
    this.identityService = identityService;
  }

  ngOnInit() {
    this.myForm = this.initForm();
    this.myForm.valueChanges.subscribe(formValues => {
      if (formValues.confirmPassword == '') {
        this.myForm?.controls['confirmPassword'].setErrors({ required: true }, { emitEvent: false });
      } else if (formValues.confirmPassword != formValues.password) {
        this.myForm?.controls['confirmPassword'].setErrors({ password: true }, { emitEvent: false });
      } else {
        this.myForm?.controls['confirmPassword'].setErrors(null, { emitEvent: false });
      }
    });
  }

  private initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(
        '',{
          validators:[Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')],
            asyncValidators:[checkEmailInSystemValidator(this.identityService)]
        }
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])
      ),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.identityService.SignUp(this.myForm.value).subscribe(
      (res: any) => {
        this.route.navigate(['/error/confirmEmail']);
        this.dialog.closeAll();
      },
      err => {
        console.log(err);
      }
    );
  }
}
