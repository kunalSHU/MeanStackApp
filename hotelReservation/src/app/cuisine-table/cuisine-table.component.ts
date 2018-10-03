import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CuisineTableDataSource } from './cuisine-table-datasource';
import {HomeComponent} from '../home/home.component';
@Component({
  selector: 'app-cuisine-table',
  templateUrl: './cuisine-table.component.html',
  styleUrls: ['./cuisine-table.component.css']
})
export class CuisineTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CuisineTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(private homeComponent: HomeComponent){

  }


  ngOnInit() {
    this.dataSource = new CuisineTableDataSource(this.paginator, this.sort);
  }
}
