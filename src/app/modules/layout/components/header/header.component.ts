import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  ngUnsubscribe$ = new Subject();
  title = 'InnoClinic';
  authService:IdentityService;
  constructor(private identityService: IdentityService) {
    this.authService = identityService;
  }

  ngOnInit(): void {
    this.authService.isAuth$.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(res => (this.isAuth = res));
  }

  signOut(){
    this.authService.SignOut().subscribe(
      (res:any) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.authService.isAuth$.next(false);
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next(null);
  }
}
