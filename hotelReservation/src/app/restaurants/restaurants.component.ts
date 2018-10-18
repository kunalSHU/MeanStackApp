import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {NgForm, FormControl} from '@angular/forms';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';
import {RestaurantTableComponent} from '../restaurant-table/restaurant-table.component';
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    /*var i;
    var formatted_lst: string[] = [];
    let unformatted_data = JSON.parse(localStorage.getItem('cuisineData'));
    for(i = 0; i < unformatted_data.length; i++){
      formatted_lst.push(unformatted_data[i].restaurant)
    }
    console.log(formatted_lst);*/

  }
}
