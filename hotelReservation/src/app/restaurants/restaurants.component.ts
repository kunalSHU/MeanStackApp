import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  @ViewChild(MatTableDataSource) filterData: MatTableDataSource<any>;
  dataSources: MatTableDataSource<any>;
  displayedColumns: string[] = ['userId', 'id', 'title', 'body'];
  constructor() { }

  ngOnInit() {
    /*var i;
    var formatted_lst: string[] = [];
    let unformatted_data = JSON.parse(localStorage.getItem('cuisineData'));
    for(i = 0; i < unformatted_data.length; i++){
      formatted_lst.push(unformatted_data[i].restaurant)
    }
    console.log(formatted_lst);*/
    var lst = JSON.parse(localStorage.getItem('restaurantData'));
    this.dataSources = new MatTableDataSource(lst);
    console.log(this.dataSources);
  }
}
