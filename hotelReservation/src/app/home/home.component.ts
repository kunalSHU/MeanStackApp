import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {MapsAPILoader} from '@agm/core';
import {NgForm, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  autocomplete:any;
  locationControl = new FormControl();

  //Search functionality using google maps API
  @ViewChild('search') public searchElement: ElementRef;

  constructor(private router: Router,private mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
    localStorage.setItem('homeUrl', this.router.url);
    this.mapsAPILoader.load().then(()=> {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["(cities)"] });
    });
  }
  onSubmit(form: NgForm){
    console.log(form);
  }

}
