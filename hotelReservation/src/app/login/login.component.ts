import { Component, OnInit } from '@angular/core';
import {AppModule} from '../../app/app.module';
import {NgProgress} from '@ngx-progressbar/core';
import {NgForm, FormControl} from '@angular/forms';
import {LoginModel} from './login.model';
import {Router} from '@angular/router';
import {AppService} from '../service/app.service';
import * as jwt from 'jsonwebtoken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AppService]
})
export class LoginComponent implements OnInit {
  hide = true;
  usernameControl = new FormControl();
  passwordControl = new FormControl();
  isUserExists: boolean = true;
  isPasswordCorrect: boolean = true;
  public isUserLoggedIn;

  constructor(private appService: AppService, private router: Router){
    this.isUserLoggedIn = false;
  }
  ngOnInit() {

    //means we are back in the login route and token must be reset
    if(this.router.url != localStorage.getItem('homeUrl')){
      localStorage.setItem('token', 'null');
    }

  }
  onSubmit(f: NgForm) {
    console.log("In the submit function");
    //make a get request to the db to see if the user with those credentials exists
    const userCred: LoginModel = {
     username: this.usernameControl.value,
     password:  this.passwordControl.value
    }
    //generate a user token here, which keeps the sensitive
    //user information encrypted over HTTP 
    //var token = jwt.sign(userCred, 'secretKey');
    //console.log(token);

    //validates the users credentials in the backend
    if(userCred.username!=null && userCred.password!=null){
      this.appService.postUserLogin(userCred).subscribe(result =>   
      {
        console.log('in the subscribe');
        console.log(result);
        console.log(this.router.url);
        console.log(JSON.stringify(result));
        //this.router.navigate(['/home']);
        if(result.status == 200){
          //successful so the user can login
          if(!this.isUserExists){ this.isUserExists = true; }
          if(!this.isPasswordCorrect){ this.isPasswordCorrect = true; }
          console.log('user can login');
          console.log(this.isUserExists && this.isPasswordCorrect);
          if(this.isUserExists && this.isPasswordCorrect){
            this.router.navigate(['/home']);
            console.log('navigate to home');
            this.isUserLoggedIn = true;
            localStorage.setItem('username', this.usernameControl.value);
            localStorage.setItem('token', result.userToken);
            //this.appService.setUserLoggedIn(true);
          }
        }
        else{
          localStorage.setItem('username', 'null');
          localStorage.setItem('token', 'null');
          console.log("The ELSE BLOVVK");
          //not successful, display an error message
          if(result.error == "Username does not exist"){
            this.isUserExists = false;
            this.isPasswordCorrect = true;    
          }
          else if(result.error == "Password is incorrect"){
            this.isPasswordCorrect = false;
            this.isUserExists = true;

          }
        }
      });
    }
  }
}
