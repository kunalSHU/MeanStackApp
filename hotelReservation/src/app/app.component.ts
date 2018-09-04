import { Component } from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  Event, Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myApp';
  loading = true;
  //all icons in the app will go here
}
