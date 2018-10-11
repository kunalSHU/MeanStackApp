import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {NgForm, FormControl} from '@angular/forms';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';
import {CuisineTableComponent} from '../cuisine-table/cuisine-table.component';
@Component({
  selector: 'app-nav-pic',
  templateUrl: './nav-pic.component.html',
  styleUrls: ['./nav-pic.component.css']
})
export class NavPicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
