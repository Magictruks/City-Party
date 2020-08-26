import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { JwtService } from 'src/app/services/jwt.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private jwtService: JwtService) {
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(user) {
    return this.http.post(environment.configUrl + 'authentication', user)
    .pipe(map(user => {
      console.log(user)
      console.log(user['token'])
      localStorage.setItem('currentUser', JSON.stringify(user['access_token']))
      localStorage.setItem('refresh_token', JSON.stringify(user['refresh_token']))
      this.currentUserSubject.next(user)
      return user
    }))
  }

  logout() {
    const user = this.jwtService.jwtDecode(localStorage.getItem('currentUser'))
    console.log(user)
    console.log(user.id)
    // return this.http.put(environment.configUrl + 'logout', user.id, {headers: { 'Access-Control-Allow-Origin' : '*'}}).subscribe(res => {
    //   console.log(res)
    //   localStorage.removeItem('currentUser');
    //   this.currentUserSubject.next(null);
    // })
    // return this.http.put(environment.configUrl + 'logout', id)
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
