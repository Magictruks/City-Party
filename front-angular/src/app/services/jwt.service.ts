import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient) { }

  jwtDecode(jwt) {
    return jwt_decode(jwt)
  }

  jwtRefresh() {
    const params = {refresh_token: JSON.parse(localStorage.getItem('refresh_token'))}
    return this.httpClient.post(environment.configUrl + "refresh_token", params)
  }
}
