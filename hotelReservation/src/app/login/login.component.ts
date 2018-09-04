import { Component, OnInit } from '@angular/core';
import {AppModule} from '../../app/app.module';
import {NgProgress} from '@ngx-progressbar/core';
import {NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  Event, Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  constructor(private router: Router) { 
    this.router.events.subscribe((event:Event) => {
      switch(true){
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }

    });
  }
  ngOnInit() {
  }
  register(){
    //add progress bar for register page here
    
    console.log(this.loading);
  }
}
