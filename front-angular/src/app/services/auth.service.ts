import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  configUrl = "http://localhost:8000/"
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(user) {
    return this.http.post(this.configUrl + 'authentication_token', user)
    .pipe(map(user => {
      console.log(user)
      console.log(user['token'])
      localStorage.setItem('currentUser', JSON.stringify(user['token']))
      localStorage.setItem('refresh_token', JSON.stringify(user['refresh_token']))
      this.currentUserSubject.next(user)
      return user
    }))
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
