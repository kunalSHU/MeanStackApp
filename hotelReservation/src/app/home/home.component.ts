import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {NgForm, FormControl} from '@angular/forms';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {AppService} from '../service/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  autocomplete:any;
  locationControl = new FormControl();
  isCityExist: boolean = true;
  loading: any = 0;
  cuisines: any;
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
        this.isCityExist = true;
        this.loading = 1;
        setTimeout(() => { // here
          this.loading = 2;
        }, 2000);

        //find ID of the location from the response
        let i;
        let cityState = city[0] + ', ' + city[1];
        let location_array = result.location_suggestions;
        var location_id;
        
        if(city.length > 1){
          for(i=0; i < location_array.length; i++){
            
            //found it, grab the ID and break out of loop
            if(location_array[i].name == cityState){
              location_id = location_array[i].id;
              break;
            }
          }
        }
        //Mumbai case
        else{

        }

        //make a get request to get the types of cuisines in the city, based on loc ID
        this.appService.getCuisineFromZomato(headers, location_id).subscribe(result => {
          console.log(result);
          (<HTMLInputElement>document.getElementById("locationCuisines")).innerHTML = JSON.stringify(result);
        });

      }
      //that city DNE
      else{
        console.log("not good input");
        this.isCityExist = false;
      }
    });
    console.log(form);
  }

}
