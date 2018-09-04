import { Component, OnInit } from '@angular/core';
import {AppModule} from '../../app/app.module';
import {NgProgress} from '@ngx-progressbar/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public progress: NgProgress) { }

  ngOnInit() {
  }
  register(){
    //add progress bar for register page here
    this.progress.start();
    setTimeout(() => {
      this.progress.complete();
    }, 2000);
    console.log('register button was clicked');
  }
}
