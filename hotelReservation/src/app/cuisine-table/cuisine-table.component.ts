import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

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
  selection = new SelectionModel<any>(true, []);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  //displayedColumns = ['cuisine_id', 'cuisine_name'];
  displayedColumns: string[] = ['select','cuisine_id', 'cuisine_name'];
  constructor(){
  }

  ngOnInit() {
    console.log(this.sort);
    //console.log(this.selection);
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

  }
  applyFilter(filterValue: string){
    console.log('in the apply filter');
    console.log(this.dataSource);
    console.log(this.dataSource.paginator);
      
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
