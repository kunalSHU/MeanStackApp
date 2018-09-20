import { Component, OnInit } from '@angular/core';
import {AppModule} from '../../app/app.module';
import {NgProgress} from '@ngx-progressbar/core';
import {NgForm, FormControl} from '@angular/forms';
import {LoginModel} from './login.model';
import {Router} from '@angular/router';
import {AppService} from '../service/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  usernameControl = new FormControl();
  passwordControl = new FormControl();
  isUserExists: boolean = true;
  isPasswordCorrect: boolean = true;

  constructor(private appService: AppService, private router: Router){}
  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    console.log("In the submit function");
    //make a get request to the db to see if the user with those credentials exists
    const userCred: LoginModel = {
     username: this.usernameControl.value,
     password:  this.passwordControl.value
    }
    //validates the users credentials in the backend
    this.appService.getUserLogin(userCred).subscribe(result =>   
    {
      console.log('in the subscribe');
      console.log(result);

      console.log(JSON.stringify(result));
      if(result.status == 200){
        //successful so the user can login
        if(!this.isUserExists){ this.isUserExists = true; }
        if(!this.isPasswordCorrect){ this.isPasswordCorrect = true; }

        if(this.isUserExists && this.isPasswordCorrect){
          this.router.navigate(['home']);
        }
      }
      else{
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
