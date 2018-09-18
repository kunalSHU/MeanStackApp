import { Component, OnInit } from '@angular/core';
import {AppModule} from '../../app/app.module';
import {NgProgress} from '@ngx-progressbar/core';
import {NgForm, FormControl} from '@angular/forms';
import {LoginModel} from './login.model';
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

  constructor(private appService: AppService){}

  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    console.log("In the submit function");
    //make a get request to the db to see if the user with those credentials exists
    const userCred: LoginModel = {
     username: this.usernameControl.value,
     password:  this.passwordControl.value
    }
    
    this.appService.getUserLogin(userCred).subscribe(result =>   
    {
      console.log(result);
    });
  }
}
