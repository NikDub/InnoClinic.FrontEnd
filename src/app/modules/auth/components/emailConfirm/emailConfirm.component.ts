import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';
import { SignInComponent } from '../SignIn/SignIn.component';

@Component({
  selector: 'app-emailConfirm',
  templateUrl: './emailConfirm.component.html',
  styleUrls: ['./emailConfirm.component.scss']
})
export class EmailConfirmComponent implements OnInit {
  time: number = 5;
  isVerifired: boolean = false;
  isError: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private identityService: IdentityService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.confirmEmail();
  }

  ngOnInit() {}

  private confirmEmail = () => {
    const token = this._route.snapshot.queryParams['token'];
    const email = this._route.snapshot.queryParams['email'];

    this.identityService.confirmEmail(email, token).subscribe(
      (res: any) => {
        this.isVerifired = true;
        this.startTimer();
        console.log(res);
      },
      error => {
        this.isError = true;
        console.error(error);
      }
    );
  };

  startTimer() {
    const interval = setInterval(() => {
      if (this.time > 0) {
        this.time--;
      } else {
        this.authAndRedirect();
        clearInterval(interval);
      }
    }, 1000);
  }

  authAndRedirect() {
    const dialog = this.dialog.open(SignInComponent, {
      height: '265px',
      width: '500px'
    });

    dialog.afterClosed().subscribe(() => {
      if (this.identityService.isPatient()) {
        this.router.navigate(['/patients/create']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
