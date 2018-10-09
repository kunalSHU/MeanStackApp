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
  selectedCuisines: any[] = [];
  row_fake_tuples: any[] = [];
  found: boolean = false;
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
  checkBoxSelection(name_array : SelectionModel<any>){
    console.log(name_array);
    console.log(name_array.selected);
    //console.log(name_array._selection);
  }
  selectedRow(row_original){
    console.log(row_original);
    row_original.isSelected = true;
    this.found = false;
    //loop through the list of selected cuisines to see if that 
    //cuisine needs to be removed or added to the list
    var i;
    if(this.selectedCuisines.length != 0){
      for(i = 0; i < this.selectedCuisines.length; i++){

        //must remove that cuisine from the list here
        console.log(this.selectedCuisines[i].cuisine_id);
        console.log(row_original.cuisine_id);
        if((this.selectedCuisines[i].cuisine_id == row_original.cuisine_id)){
          //removes that element at that index
          this.found = true;
          
          var index = this.selectedCuisines.findIndex(x=>x.cuisine_name == row_original.cuisine_name);
          console.log(index);
          this.selectedCuisines.splice(index,1);
        }
      }
    }
    if(this.found == false){
      this.selectedCuisines.push(row_original);
    }
    //need to add the cuisine here
    //when call that object has been selected so we attach a bool attribute
    if(this.selectedCuisines.length==0){
      this.selectedCuisines.push(row_original);
    }
    console.log(this.found);
    
    console.log(this.selectedCuisines);
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
