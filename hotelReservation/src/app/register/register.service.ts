import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {UserInfo} from './register.model';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
//all rest calls will go in here
export class RegisterService {
  constructor(private http: HttpClient) { }

  //all methods will go here
  postUser(userObject: UserInfo){
    return this.http.post('http://localhost:3000/api/users',JSON.stringify(userObject))
    .map((response: Response)=> response);
  }

}
