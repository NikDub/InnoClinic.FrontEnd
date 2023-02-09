import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IdentityService } from 'src/app/shared/services/identity/identity.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  identityServise: IdentityService;
  router: Router;
  constructor(authService: IdentityService, router: Router) {
    this.identityServise = authService;
    this.router = router;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('accessToken') != null) {
      var roles = route.data['Roles'] as Array<string>;
      if (roles) {
        if (roles.some(r => r == this.identityServise.roles$.value)) {
          return true;
        } else {
          this.router.navigate(['/error/forbidden']);
          return false;
        }
      }
      return true;
    } else {
      this.identityServise.openSignInDialog();
      return false;
    }
  }
}
