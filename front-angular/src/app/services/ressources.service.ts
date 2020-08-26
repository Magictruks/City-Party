import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
const header = {
  
  'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))
}

@Injectable({
  providedIn: 'root'
})

export class RessourcesService {

  // headers = {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))}

  constructor(private httpClient: HttpClient) { }

  getAll(entity) {
    return this.httpClient.get(environment.configUrlApi + entity, {headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))}})
  }

  getById(entity, id) {
    return this.httpClient.get(environment.configUrlApi + entity + '/' + id, {headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))}})
  }

  post(entity, params) {
    return this.httpClient.post(environment.configUrlApi + entity, params, {headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))}})
  }

  delete(entity, id) {
    return this.httpClient.delete(environment.configUrlApi + entity + '/' + id, {headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))}})
  }

  edit(entity, id, params) {
    console.log(params)
    return this.httpClient.put(environment.configUrlApi + entity + '/' + id, params, {headers: {'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('currentUser'))}})
  }
}
