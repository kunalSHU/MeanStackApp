import { Component, OnInit } from '@angular/core';
import {AppModule} from '../../app/app.module';
import {NgProgress} from '@ngx-progressbar/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 /* loading = true;
  constructor(private router: Router) { 
    this.router.events.subscribe((event:Event) => {
      if(event instanceof NavigationStart){
        this.loading = true;
      }
      if(event instanceof NavigationEnd){
        this.loading = false;
      }
    });
  }*/
  ngOnInit() {
  }
  register(){
    //add progress bar for register page here
  }
}
