import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort} from '@angular/material';
import {HomeComponent} from '../home/home.component';
import {MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';

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
    new_formatted_data_lst: any = [];
    dataSources: MatTableDataSource<any>;
    clickTest: boolean = false;
    totalImages: any = [];
    noData: boolean = false;
    matDialogRef: MatDialogRef<DialogOverviewExampleDialog>;
    isDisabledSearch: boolean = true;
    currentRate: number;
    collections_title: any = ['cost', 'rating'];
    index: number = 0;
    location_array: any = [];
    group: number = 5; 
    loading: boolean = false;
    location_id: any;
    constructor(private http: HttpClient, public dialog: MatDialog, private appService: AppService){
  
    }
    ngOnInit(){

      //clear collections title
      //if(this.collections_title.length != 0){
        //this.collections_title = [];
     // }

      console.log(typeof (typeof {address: 4}));
      console.log(JSON.parse(localStorage.getItem('restaurantData')).restaurants);

      //format Data source here
      this.formatted_data_lst = this.formatList(JSON.parse(localStorage.getItem('restaurantData')).restaurants);
      console.log(this.formatted_data_lst);

      //infinite scroll stuff here
      if(this.formatted_data_lst.length != 0){
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('X-Zomato-API-Key', '5f8f8c7daa019ccc1553516688930d4f');
        this.location_array = JSON.parse(localStorage.getItem("locationInfo"));
        this.location_id  = this.location_array[0].id;
        console.log(this.location_id);
        this.appService.getCollectionsFromCityZomato(headers, this.location_id).subscribe(result => {
          console.log(result);
        });
        this.getImages();
      }
      else if(this.formatted_data_lst.length == 0){
        this.noData = true;
        this.dataSources = new MatTableDataSource([{noData: "NO DATA IN HERE"}]);
      }
      console.log(this.dataSources);
      console.log(this.dataSources.data[0].name); 
    }
    getImages(){
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);

      this.new_formatted_data_lst = this.formatted_data_lst.slice(this.index, this.group);
      this.totalImages = this.totalImages.concat(this.new_formatted_data_lst);
      console.log(this.totalImages);
      if(this.totalImages[13]){
        console.log(typeof(this.totalImages[13].user_rating.rating_color));
      }
      this.dataSources = new MatTableDataSource(this.totalImages);
      ///console.log(this.getCumulativeOffset(element));
      //console.log(element.position());
      //console.log(element.css('top', ''));

      //this.dataSources = new MatTableDataSource(this.dataSources.data.concat(this.new_formatted_data_lst));
      this.index+=5;
      this.group+=5;
      console.log('in the getImages function');
    }
    
    radioClick(param: any): string{
      console.log(param);
      
      //enable the search category button here
      this.isDisabledSearch = false;

      //store clicked category in localStorage
      localStorage.setItem("categoryVal", param);

      return param;
    }
    searchClick(){
      let categoryValue = localStorage.getItem("categoryVal");
      console.log(categoryValue);

      //make get request to zomato API
      //once data is fetched in JSON then rerender table
      //reset MatTableDataSource
      var cuisine_string = localStorage.getItem("cuisineString");
      /*1%2C2*/
      console.log(cuisine_string);
    }

    test(image_url){
      console.log(image_url);
      console.log('in the test');

      if(image_url == ""){
        image_url = "../../assets/images/noImage.png";
      }

      this.clickTest = true;

      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '500px',
        height: '700px',
        data: {imageUrl: image_url, no_data: this.noData}
      });
      dialogRef.afterClosed().subscribe(result => {
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
  styleUrls: ['dialog-open.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
