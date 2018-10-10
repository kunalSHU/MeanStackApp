import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions} from '@angular/http';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {UserInfo} from '../register/register.model';
import {LoginModel} from '../login/login.model';
import {LoginComponent} from '../login/login.component';
import * as jwt from 'jsonwebtoken';
//import {jwt_decode} from 'jwt-decode';
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})

export class AppService {
  isUserLoggedIn: boolean;
  login: LoginComponent;
  constructor(private http: HttpClient) { }

  //all methods will go here
  postUser(userObject: UserInfo){
    console.log(JSON.stringify(userObject));
    return this.http.post('http://localhost:3000/api/register',userObject)
    .map((response: Response)=> response);
  }
  //verifies if user creddentials are in db,
  //if not then informs the user that username/password is not correct/DNE
  postUserLogin(loginModel: LoginModel){
    
    console.log(localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/api/home', loginModel)
    .map((response: any)=> response);
  }
  /*setUserLoggedIn(value: boolean){
    console.log('in set user login');
    this.isUserLoggedIn = value;
    console.log(this.isUserLoggedIn);
  }*/
  getUserToken(){
    return localStorage.getItem('token');
  }

  getLocationFromZomato(headers: HttpHeaders, city: any){
    const url = `https://developers.zomato.com/api/v2.1/cities?q=${city}`;
    return this.http.get(url,{headers})
    .map((response: any)=> response);
  }

  getCuisineFromZomato(headers:HttpHeaders,location_id: any){
    const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${location_id}`;
    return this.http.get(url,{headers})
    .map((response: any)=> response);
  }
  getRestaurantFromCuisineZomato(headers:HttpHeaders, locationID:number, cuisineString:string){
    const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${locationID}&entity_type=city&cuisines=${cuisineString}`
    return this.http.get(url,{headers})
    .map((response: any)=> response);    
  }

}
