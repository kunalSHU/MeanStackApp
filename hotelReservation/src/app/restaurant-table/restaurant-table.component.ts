import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-restaurant-table',
  templateUrl: './restaurant-table.component.html',
  styleUrls: ['./restaurant-table.component.css']
})
export class RestaurantTableComponent implements OnInit {
  show: boolean = false;

    //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    displayedColumns: string[] = ['id'];
    formatted_lst: any = [];
    formatted_data_lst: any = [];
    dataSources: MatTableDataSource<any>;
    constructor(private http: HttpClient){
  
    }
    ngOnInit(){
      console.log(typeof (typeof {address: 4}));
      console.log(JSON.parse(localStorage.getItem('restaurantData')).restaurants);

      //format Data source here
      this.formatted_data_lst = this.formatList(JSON.parse(localStorage.getItem('restaurantData')).restaurants);
      console.log(this.formatted_lst);
      this.dataSources = new MatTableDataSource(this.formatted_data_lst);
      //this.dataSources.sort = this.sort;
      //this.dataSources.paginator = this.paginator;
      console.log(this.dataSources);
      var dataSourceLength = this.dataSources.data.length;
      console.log(this.dataSources.data[0].name); 
    }
    
    test(){
      console.log('in the test');
    }
    formatList(lst: any){
      var i;
      for(i = 0; i < lst.length; i++){
        this.formatted_lst.push(lst[i].restaurant);
      }
      return this.formatted_lst;
    }

}
