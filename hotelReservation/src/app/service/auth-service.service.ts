import { Injectable } from '@angular/core';
import {LoginComponent} from '../login/login.component';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private loginComponent: LoginComponent) { }
  
  public checkAuthenticated() : boolean{
    if(this.loginComponent.isUserExists && this.loginComponent.isPasswordCorrect){
      return true;
    }
    else{
      return false;
    }
  }
}
