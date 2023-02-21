import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-SignIn',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.scss']
})
export class SignInComponent implements OnInit {
  hide = true;
  helper = new JwtHelperService();
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

  constructor(authServer: IdentityService, public dialog: MatDialog, private router: Router) {
    this.authServer = authServer;
  }

  ngOnInit() {}

  submit() {
    this.authServer.SignIn(this.myForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.authServer.roles$.next(this.helper.decodeToken(res.accessToken).roles);
        this.authServer.isAuth$.next(true);
        this.authServer.updateIdAndRole();
        this.dialog.closeAll();
      },
      err => {
        if (err.error == 'Your email has not been confirmed.') {
          this.router.navigate(['/error/confirmEmail']);
          this.dialog.closeAll();
        }
        console.log(err);
      }
    );
  }
}
