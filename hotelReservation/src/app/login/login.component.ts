import { Component, OnInit } from '@angular/core';
import {AppModule} from '../../app/app.module';
import {NgProgress} from '@ngx-progressbar/core';
import {NgForm, FormControl} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  usernameControl = new FormControl();
  passwordControl = new FormControl();
  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    console.log("In the submit function");
  }
}
