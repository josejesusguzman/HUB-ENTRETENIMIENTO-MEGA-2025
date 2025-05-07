import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, take, tap } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<boolean> | boolean {
    return this.auth.isLoggedIn$.pipe(
      take(1),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login'])
        }
      })
    )
  }

}