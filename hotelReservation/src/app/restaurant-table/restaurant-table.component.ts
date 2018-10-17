import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
    clickTest: boolean = false;
    noData: boolean = false;
    finished: boolean = false;
    constructor(private http: HttpClient, public dialog: MatDialog){
  
    }
    ngOnInit(){
      console.log(typeof (typeof {address: 4}));
      console.log(JSON.parse(localStorage.getItem('restaurantData')).restaurants);

      //format Data source here
      this.formatted_data_lst = this.formatList(JSON.parse(localStorage.getItem('restaurantData')).restaurants);
      console.log(this.formatted_data_lst);

      //infinite scroll stuff here
      if(this.formatted_data_lst.length != 0){
        this.dataSources = new MatTableDataSource(this.formatted_data_lst);
      }
      else if(this.formatted_data_lst.length == 0){
        this.noData = true;
        this.dataSources = new MatTableDataSource([{noData: "NO DATA IN HERE"}]);
      }
      console.log(this.dataSources);
      console.log(this.dataSources.data[0].name); 
    }
    
    test(){
      console.log('in the test');
      this.clickTest = true;
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    formatList(lst: any){
      var i;
      for(i = 0; i < lst.length; i++){
        this.formatted_lst.push(lst[i].restaurant);
      }
      return this.formatted_lst;
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-open.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
