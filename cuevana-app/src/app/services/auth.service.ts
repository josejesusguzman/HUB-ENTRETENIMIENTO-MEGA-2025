import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, tap } from 'rxjs';
import { ApiService } from './ApiService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private api: ApiService) { }

  private hasToken(): boolean {
    return !!localStorage.getItem("jwt");
  }

  // ESTO ES UNA SIMULACIÓN DEL LOGIN
  login(user: string, pass: string){
    return this.api.login(user, pass).pipe(
      tap(res => {
          localStorage.setItem('jwt', res.token);
          this.loggedIn.next(true);
      })
    );
  }

  logout()
  {
    localStorage.removeItem("jwt");
    this.loggedIn.next(false);
  }
}
