import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthServiceService} from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate{

  constructor(public auth: AuthServiceService, public router: Router) { }

  canActivate(): boolean{
    if(!this.auth.checkAuthenticated()){
      return false;
    }
    else{
      return true;
    }
  }

}
