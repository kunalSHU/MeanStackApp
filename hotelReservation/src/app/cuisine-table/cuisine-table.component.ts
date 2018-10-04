import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CuisineTableDataSource } from './cuisine-table-datasource';
import {HomeComponent} from '../home/home.component';
import {MatTableDataSource} from '@angular/material';
export interface PeriodicElement {
  name: string;
  position: number;
}

@Component({
  selector: 'app-cuisine-table',
  templateUrl: './cuisine-table.component.html',
  styleUrls: ['./cuisine-table.component.css']
})
export class CuisineTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTableDataSource) filterData: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = ['cuisine_id', 'cuisine_name'];
  displayedColumns: string[] = ['cuisine_id', 'cuisine_name'];
  constructor(){
  }

  ngOnInit() {
    console.log(this.sort);
    //this.dataSource = new CuisineTableDataSource(this.paginator, this.sort, this.filterData);
    //console.log(this.dataSource);
    //this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('cuisineData')));
    var i;
    var formatted_lst: string[] = [];
    let unformatted_data = JSON.parse(localStorage.getItem('cuisineData'));
    for(i = 0; i < unformatted_data.length; i++){
      formatted_lst.push(unformatted_data[i].cuisine)
    }
    //localStorage.setItem('formattedData', formatted_lst);
    console.log(formatted_lst);
    this.dataSource = new MatTableDataSource(formatted_lst);
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //console.log(this.dataSource);
    /*this.dataSource.filterPredicate = (data, filter) => {
      console.log(data);
      console.log(filter);
      console.log(this.displayedColumns.some);
      return data.cuisine[this.displayedColumns[1]] == filter;
      /*return this.displayedColumns.some(ele => {
        console.log(typeof ele);
        console.log(data.cuisine[this.displayedColumns[1]]);
        return ele != 'actions' && data.cuisine[this.displayedColumns[1]].toLowerCase.indexOf(filter) != -1;
      })
  } */
    //console.log(this.dataSource);
  }
  applyFilter(filterValue: string){
    console.log('in the apply filter');
    console.log(this.dataSource);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
