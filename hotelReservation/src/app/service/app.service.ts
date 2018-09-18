import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {UserInfo} from '../register/register.model';
import {LoginModel} from '../login/login.model';

import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  //all methods will go here
  postUser(userObject: UserInfo){
    console.log(JSON.stringify(userObject));
    return this.http.post('http://localhost:3000/api/register',userObject)
    .map((response: Response)=> response);
  }

  //verifies if user creddentials are in db,
  //if not then informs the user that username/password is not correct/DNE
  getUserLogin(loginModel: LoginModel){
    console.log('http://localhost:3000/api/users/'+loginModel);
    return this.http.get('http://localhost:3000/api/users/'+loginModel.username+'/'+loginModel.password)
    .map((response: Response)=> response);
  }

}
