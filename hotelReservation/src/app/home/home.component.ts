import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {NgForm, FormControl} from '@angular/forms';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';
//import {CuisineTableDataSource} from '../cuisine-table/cuisine-table-datasource';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  autocomplete:any;
  locationControl = new FormControl();
  isCityExist: boolean = true;
  loading: boolean = false;
  cuisines: any;
  getCuisineSuccess: boolean = false;
  country_pic: any;
  isPlaceFound: boolean;
  savedResult: any;
  //Search functionality using google maps API
  @ViewChild('search') public searchElement: ElementRef;

  constructor(private router: Router,private mapsAPILoader: MapsAPILoader,
  private appService: AppService, /*private cuisineTableData: CuisineTableDataSource*/) { }

  ngOnInit() {
    localStorage.setItem('homeUrl', this.router.url);
    this.mapsAPILoader.load().then(()=> {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["(cities)"] });
    });
    
  }
  onSubmit(form: NgForm){
    //Using the Zomato API here
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('X-Zomato-API-Key', '5f8f8c7daa019ccc1553516688930d4f');
    let location: String = this.searchElement.nativeElement.value;
    
    //parsing the location to get the city
    let city: any = location.split(', ');
    console.log("This is the city parsed " + city[0]);
    console.log(city[0] + ', ' + city[1]);
    this.appService.getLocationFromZomato(headers, city[0]).subscribe(result =>{ 
      console.log(result);

      //good to go
      if(result.location_suggestions.length > 0){
        console.log('good to go');
        console.log(city[city.length-1]);
        this.isCityExist = true;
        //Brazil and UK is special case
        if(city[city.length-1] == "Brazil"){
          city[city.length-1] = "Brasil";
        }
        if(city[city.length-1] == "UK"){
          city[city.length-1] = "United Kingdom";
        }      

        //find ID of the location from the response
        let i;
        let cityState = city[0] + ', ' + city[1];
        let location_array = result.location_suggestions;
        var location_id;
        console.log(location_array);
        console.log(cityState);
        
        //Special Case Washington DC
        if(cityState == 'Washington, DC'){
          cityState = 'Washington DC';
        }

        if(location_array.length > 1){
          for(i=0; i < location_array.length; i++){
            
            //found it, grab the ID and break out of loop
            if(location_array[i].name == cityState || location_array[i].country_name == city[city.length-1]){
              location_id = location_array[i].id;
              this.country_pic = location_array[i].country_flag_url;
              this.isPlaceFound = true;
              break;
            }
          }
          if(!this.isPlaceFound){ this.isPlaceFound = false; this.loading = false; return}
        }
        //Mumbai case
        else{
          if(location_array[0].name == cityState || location_array[0].country_name == city[city.length-1]){
            location_id = location_array[0].id;
            this.country_pic = location_array[0].country_flag_url;
          }
          else{ 
            this.isCityExist = false;
            this.loading = false;
            return
          }
        }
        console.log(this.country_pic);
        console.log('The id of the place is ' + location_id);
        //make a get request to get the types of cuisines in the city, based on loc ID
        this.appService.getCuisineFromZomato(headers, location_id).subscribe(result => {
          this.getCuisineSuccess = true;
          localStorage.setItem('cuisineData', JSON.stringify(result.cuisines));
          //this.cuisineTableData.populateData(result);
          this.loading = false; 
          console.log(result);
          console.log((typeof result.cuisines));
        });
        
      }
      //that city DNE
      else{
        console.log("not good input");
        this.isCityExist = false;
        this.loading = false;
      }
    });
    console.log(form);
  }
  
  callSubmit(form: NgForm){
    //calls onSubmit after 2 seconds of loading
    this.getCuisineSuccess = false;
    localStorage.setItem('cuisineData', null);
    this.loading = true;
    setTimeout(() => {
      this.onSubmit(form);
    }, 2000);
  }
}

