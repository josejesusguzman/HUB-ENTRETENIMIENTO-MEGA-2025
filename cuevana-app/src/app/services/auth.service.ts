import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.logged$.asObservable();

  constructor() { }

  // ESTO ES UNA SIMULACIÓN DEL LOGIN
  login(user: string, pass: string){
    const isValid = (user === 'admin' && pass === 'password');
    return of(isValid).pipe(
      delay(500),
      tap(ok => this.logged$.next(ok))
    );
  }

  logout(){
    this.logged$.next(false);
  }
}
