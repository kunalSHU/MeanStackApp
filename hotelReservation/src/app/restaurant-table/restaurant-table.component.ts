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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    //displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    displayedColumns: string[] = ['id'];
    dataSources: MatTableDataSource<any>;
    constructor(private http: HttpClient){
  
    }
    ngOnInit(){
      console.log('in init');
     this.dataSources = new MatTableDataSource([
        {position: 1},
        {position: 2},
        {position: 3},
        {position: 4},
        {position: 5},
        {position: 6},
        {position: 7},
        {position: 8},
        {position: 9},
        {position: 10},
        {position: 10},
        {position: 10},
        {position: 10},
        {position: 10},
        {position: 10} ,       
      ]);
      this.dataSources.sort = this.sort;
      this.dataSources.paginator = this.paginator;
      console.log(this.dataSources); 
    }
    
    submit(){
      /* const url = "https://reqres.in/api/users/2"
      this.http.get(url).subscribe(
        (data: any) => {
          console.log(data.data);
          this.show = true;
  
  
          this.dataSources = new MatTableDataSource([data.data]);
      });*/  
      //this.show = true;
    }

}
