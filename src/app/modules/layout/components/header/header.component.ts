import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { SignInComponent } from 'src/app/modules/auth/components/SignIn/SignIn.component';
import { CreateAppointmentComponent } from 'src/app/modules/schedules/createAppointment/createAppointment.component';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  isSchedule: boolean = false;
  ngUnsubscribe$ = new Subject();
  title = 'InnoClinic';
  authService: IdentityService;
  constructor(identityService: IdentityService, public dialog: MatDialog) {
    this.authService = identityService;
  }

  ngOnInit(): void {
    this.authService.isAuth$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => (this.isAuth = res));
  }

  signOut() {
    this.authService.SignOut().subscribe(
      (res: any) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.authService.isAuth$.next(false);
        this.authService.roles$.next(null);
      },
      err => {
        console.log(err);
      }
    );
  }

  openSignInDialog() {
    this.dialog.open(SignInComponent, {
      height: '265px',
      width: '500px'
    });
  }

  openModalCreateAppointment(){
    this.dialog.open(CreateAppointmentComponent, {
      height: '600px',
      width: '500px'
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
  }
}
