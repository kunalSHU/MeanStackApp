import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanDeactivate<LoginComponent> {
  isUserExists: boolean;

isPasswordCorrect: boolean;

  constructor(private http: HttpClient,private router: Router, private appService: AppService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log("In the guard");
    console.log(localStorage.getItem('username'));
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('username') == 'null');
    
      if(localStorage.getItem('username')!='null' && localStorage.getItem('token')!='null'){
        console.log('in here');
        localStorage.setItem('username', 'null');
        return true;
      }
      else{
        //this.router.navigate([]);
        console.log('in the right spot now');
        this.router.navigate(['/login']);
        return false;
      }
    /*if(this.appService.getUserLoggedIn()){
      this.router.navigate(['/home']);   
      return true;
    }
    else{
      console.log('in here');
      this.isUserExists = false;
      this.isPasswordCorrect = true;
      this.router.navigate(['/']); 
      return false;
    }*/ 
  }
  canDeactivate(component: LoginComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean{
    return false;
  };
  
}
