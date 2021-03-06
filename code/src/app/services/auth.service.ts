import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from '~models/user';
import { Response } from '~app/models/response';
import { CONSTANST } from '~utils/constanst';

@Injectable()
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    public http: HttpClient
  ) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +localStorage.getItem('token')
  });  //({
    //'x-auth-token': localStorage.getItem('token')
  //});

  login(user: User): Observable<Response> {
    console.warn(user)
    return this.http.post<Response>(
      CONSTANST.routes.authorization.login, {
      email: user.email,
      password: user.password
    });
  }

  logout(): Observable<Response> {
    return this.http.post<Response>(
      CONSTANST.routes.authorization.logout,
      { headers: this.headers }
    );
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

}
