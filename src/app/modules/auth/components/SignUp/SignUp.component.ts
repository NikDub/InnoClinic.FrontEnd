import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Component({
  selector: 'app-SignUp',
  templateUrl: './SignUp.component.html',
  styleUrls: ['./SignUp.component.scss']
})
export class SignUpComponent implements OnInit {
  hide = true;
  authServer: IdentityService;

  myForm: FormGroup;
  constructor(authServer: IdentityService) {
    this.authServer = authServer;
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
        '',
        Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])
      ),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  submit() {
    this.authServer.SignUp(this.myForm.value).subscribe(
      (res:any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.authServer.isAuth$.next(true);
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
