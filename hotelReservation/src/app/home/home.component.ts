import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {NgForm, FormControl} from '@angular/forms';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';
import {CuisineTableComponent} from '../cuisine-table/cuisine-table.component';

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
  resShow: boolean = false;
  
  country_pic: any;
  isPlaceFound: any;
  savedResult: any;
  location_id: number;
  loadingRes:boolean;
  //Search functionality using google maps API
  @ViewChild('search') public searchElement: ElementRef;

  constructor(private router: Router,private mapsAPILoader: MapsAPILoader,
  private appService: AppService) { }

  ngOnInit() {
    localStorage.setItem('homeUrl', this.router.url);
    this.mapsAPILoader.load().then(()=> {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["(cities)"] });
    });
    
  }
  onSubmit(form: NgForm){
 
     //this.isPlaceFound = 0; 
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
        localStorage.setItem("locationInfo", JSON.stringify(location_array));
        console.log(location_array);
        console.log(cityState);
        
        //Special Case Washington DC
        if(cityState == 'Washington, DC'){
          cityState = 'Washington DC';
        }
        if(cityState == 'New York, NY'){
          cityState = 'New York City, NY';
        }

        if(location_array.length > 1){
          console.log('array more than size 1 for paris');
          for(i=0; i < location_array.length; i++){
            
            //found it, grab the ID and break out of loop
            if(location_array[i].name == cityState || location_array[i].country_name == city[city.length-1]){
              console.log('in the if statement');
              this.location_id = location_array[i].id;
              this.country_pic = location_array[i].country_flag_url;
              this.isPlaceFound = true;
              this.isCityExist = true;
              break;
            }
          }
          console.log(this.isPlaceFound);
          console.log(this.isCityExist);
          if(!this.isPlaceFound){ 
            console.log('paris not found')
            this.isPlaceFound = false; 
            this.isCityExist = false; 
            this.loading = false; 
            return
          }
        }
        //Mumbai case
        else{
          if(location_array[0].name == cityState || location_array[0].country_name == city[city.length-1]){
            this.location_id = location_array[0].id;
            this.country_pic = location_array[0].country_flag_url;
            this.isCityExist = true;
            this.isPlaceFound = true;
            
          }
          else{ 
            this.isCityExist = false;
            this.loading = false;
            this.isPlaceFound = false;
            return
          }
        }
        console.log(this.country_pic);
        console.log('The id of the place is ' + this.location_id);
        //make a get request to get the types of cuisines in the city, based on loc ID
        this.appService.getCuisineFromZomato(headers, this.location_id).subscribe(result => {
          this.getCuisineSuccess = true;
          localStorage.setItem('cuisineData', JSON.stringify(result.cuisines));
          //this.cuisineTableData.populateData(result);
          this.loading = false; 
          console.log(result.cuisines);
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
  searchCuisineClick(){
    console.log('in searchCuisineClick');
    console.log(this.location_id);
    console.log(localStorage.getItem("selectedCuisines"));
    //localStorage.setItem("selectedCuisines", null);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append('X-Zomato-API-Key', '5f8f8c7daa019ccc1553516688930d4f');

    let json_cuisines_array = JSON.parse(localStorage.getItem("selectedCuisines"));
    console.log(json_cuisines_array);

    var i;
    var cuisine_id_string = "";
    if(json_cuisines_array != null){
      for(i = 0; i < json_cuisines_array.length; i++){
        cuisine_id_string += json_cuisines_array[i].cuisine_id.toString() + '%2C';
      }
    
      var formatted_cuisine_string = cuisine_id_string.slice(0,cuisine_id_string.length-3);
      console.log(formatted_cuisine_string);

      //grab each of the cuisine ID's and format it into a string

      //make a request to the zomato API here
      //their search endpoint
      //arguments: locatoin_id, enitytype=city, list of cuisine ID (string)
      this.appService.getRestaurantFromCuisineZomato(headers, this.location_id, formatted_cuisine_string).subscribe(result=>{
        console.log(result);
        console.log(result.restaurants);
        localStorage.setItem('restaurantData', JSON.stringify(result));
        //$("#cuisine-card").hide();
        //$("#rectangle").hide();
        //$("#locationForm").hide();
        //$(".line").hide();
        //this.loading = true;
        //setTimeout(() => {
         // this.loading = false;
         // this.resShow = true;
        //  
        //}, 2000);
        this.router.navigate(['/restaurants']);
       // console.log(this.router.url);
        //this.router.routeReuseStrategy.shouldReuseRoute = function (){
        //  return false;
        //}
      })
    }
    else{
      console.log('you selected nothing');
    }
    // localStorage.setItem("selectedCuisines", null);
  }
  callSubmit(form: NgForm){
    //calls onSubmit after 2 seconds of loading
    this.getCuisineSuccess = false;
    localStorage.setItem('cuisineData', null);
    localStorage.setItem('selectedCuisines', null);
    localStorage.setItem('cuisineSelectedBool', null);
    this.loading = true;
    this.reset();
    this.onSubmit(form);
    setTimeout(() => {
      this.onSubmit(form);
    }, 2000);
  }
  /*searchRestaurantSubmit(){
    this.loadingRes = true;
    setTimeout(() => {
      this.searchCuisineClick();
    }, 2000);
  }*/

  reset(){
    this.isCityExist = undefined;
    this.isPlaceFound = undefined;
  }
}

