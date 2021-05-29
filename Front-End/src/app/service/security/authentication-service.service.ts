import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  executeAuthentication(email,password): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}login`,{email,password}).pipe(
      map(
        response => {
          sessionStorage.setItem("email",response.email)
          sessionStorage.setItem("token",`Bearer ${response.token}`)
          return response;
        }
      )
    )
  }

  createUser(email,password):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}signup`,{email,password}).pipe(
      map(
        response => {
          return response;
        }
      )
    )
  }
  getAuthentication(){
    return sessionStorage.getItem("email");
  }
  getToken(){
    if(this.getAuthentication()){ //
      return sessionStorage.getItem('token')
    }
  }
}
