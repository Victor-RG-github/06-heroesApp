import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  Router,
  UrlSegment,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkSessionStatus().pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
      }),
      map((isAuthenticated) => !isAuthenticated) //Como devolvemos un false le tenemos que dar la vuelta para que el canMatch pueda funcionar.
    );
  }
}
