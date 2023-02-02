import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Component({
  selector: 'app-SignIn',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  authServer: IdentityService;
  myForm: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
    ),
    password: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    )
  });

  constructor(authServer: IdentityService) {
    this.authServer = authServer;
  }

  ngOnInit() {}

  submit() {
    this.authServer.SignIn(this.myForm.value).subscribe(
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
