import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';
import {UserInfo} from './register.model';
import {FormControl, FormGroupDirective, ValidatorFn, NgForm, FormGroup,Validators, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps'
//GOOGLE MAPS API KEY: AIzaSyD153ySYhJSsAxppuq-BDLRFJ7GTy1PKe4
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  isSelectedStep1 = false;
  isSelectedStep2 = false;
  private control:AbstractControl;

  animating: any;
  current_fs: any;
  next_fs: any;
  previous_fs: any;
  left:any;
  opacity:any;
  scale:any;
  AccountSetup: NgForm;
  password: any;
  confirmpassword: any;
  //Regex for patterns
  emailPattern = "^[a-z]+@[a-z]+[.](com|ca)$";
  fullnamePattern = "^[a-zA-Z]{2,13} [a-zA-Z]{2,13}$";
  usernamePattern = "^[a-zA-Z0-9]{4,12}$"
  numberPattern = "^[0-9]{10,15}$";

  //Search functionality using google maps API
  @ViewChild('search') public searchElement: ElementRef;

  //Required Validators
  emailFormControl = new FormControl('');
  passwordFormControl = new FormControl('');
  confirmpasswordFormControl = new FormControl('');
  firstNameFormControl = new FormControl('');
  lastNameFormControl = new FormControl('');
  dateBirthFormControl = new FormControl('');
  numberControl = new FormControl('');
  streetControl = new FormControl('');
  postalCodeControl = new FormControl('');

  matcher = new MyErrorStateMatcher();

  //storing the chip buttons to be used in a list
  availableColors: ChipColor[] = [
    {name: 'none', color: undefined},
    {name: 'Next', color: 'primary'},
    {name: 'Accent', color: 'accent'},
    {name: 'Warn', color: 'warn'}

  ];
  
  //custom validator test
  emailPatternValidator(pattern: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        console.log('in the validator');
        if (control.value == pattern) {
          console.log('email matches pattern');
            return { 'ageRange': true };
        }
        return null;
    };
  }
  constructor(public snackBar: MatSnackBar, private http: HttpClient, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  //this is where we take user data and make an ajax request to the db
  //to register the user 
  openSnackBar(){
    this.snackBar.openFromComponent(SubmitComponent, {duration: 800,
    });
  }
  ngOnInit() {
    this.mapsAPILoader.load().then(()=> {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });
    
      autocomplete.addListener('places_changed', () => {

        this.ngZone.run(()=> {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if(place.geometry == undefined || place.geometry == null){
            return;
          }

        })
      });
    });
  }  

  validateFirstnext(email: boolean, requiredEmail: boolean, requiredPassword: boolean, requiredConfirmpassword: boolean){
    /*console.log(email);
    console.log(requiredEmail);
    console.log(requiredPassword);
    console.log(requiredConfirmpassword);*/ 
    if(this.passwordFormControl.value != this.confirmpasswordFormControl.value){
      this.isSelectedStep1 = false;
    }
    else if(!(!email && !requiredEmail && !requiredPassword && !requiredConfirmpassword)){
      this.isSelectedStep1 = false;
    }
    else if(this.isSelectedStep1){
      this.firstnextCall();
    }
    else if(!email && !requiredEmail && !requiredPassword && !requiredConfirmpassword){
      if(this.password == this.confirmpassword){
        this.isSelectedStep1 = true;
      }
      else{
        //alert("password mismatch");
      } 
    }
  }

  validateSecondnext(firstNamerequired: boolean, firstNamePattern: boolean,
    lastNamerequired: boolean, lastNamePattern: boolean,
    dateOfBirthrequired: boolean,telephonerequired: boolean, 
    telephonePattern: boolean,streetrequired:boolean, 
    coderequired: boolean){

      /*console.log(firstNamerequired);
      console.log(firstNamePattern);
      console.log(lastNamerequired);
      console.log(lastNamePattern);
      console.log(dateOfBirthrequired);
      console.log(telephonerequired);
      console.log(telephonePattern);
      console.log(streetrequired);
      console.log(coderequired);*/
      if(!(!firstNamerequired && (firstNamePattern==null) && !lastNamerequired && (lastNamePattern==null) &&
      !dateOfBirthrequired && !telephonerequired && (telephonePattern==null) && !streetrequired && !coderequired)){
        this.isSelectedStep2 = false;
      }
      else if(this.isSelectedStep2){
        this.secondnextCall();
      }
      else if(!firstNamerequired && (firstNamePattern==null) && !lastNamerequired && (lastNamePattern==null) &&
        !dateOfBirthrequired && !telephonerequired && (telephonePattern==null) && !streetrequired && !coderequired){
          this.isSelectedStep2 = true;
      }
  }

  //package the user info and post it to the db
  registerSubmit(){

    //data payload for the user
    const userData: UserInfo = {
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      firstName: this.firstNameFormControl.value,
      lastName: this.lastNameFormControl.value,
      dateBirth: this.dateBirthFormControl.value,
      telephone: this.numberControl.value,
      street: this.streetControl.value,
      postalCode: this.postalCodeControl.value,
    }

    const headers= new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    //sending the user data to the server for POST request
    this.http.post('http://localhost:3000/api/users',
    JSON.stringify(userData)).subscribe(
      (data: any) => {
        console.log(data);
    });

    console.log(this.dateBirthFormControl.value);
  }

  firstnextCall(){
    //Using JQuery for the progress bar 
    $("#msform").children("#f1").hide();
    this.current_fs = $(this).parent();
    this.next_fs = $(this).parent().next();
    $("#progressbar li").eq(1).addClass("active");
    $("#msform").children("#f2").show();
  }
  secondnextCall(){
    $("#msform").children("#f2").hide();
    this.current_fs = $(this).parent();
    this.next_fs = $(this).parent().next();
    $("#progressbar li").eq(2).addClass("active");
    $("#msform").children("#f3").show();
    $("#submitButton").show();
  }
  firstprevCall(){
    //Using JQuery for the progress bar 
    $("#msform").children("#f2").hide();
    this.current_fs = $(this).parent();
    this.next_fs = $(this).parent().prev();
    $("#progressbar li").eq(1).removeClass("active");
    $("#msform").children("#f1").show();
  }
  secondprevCall(){
    //Using JQuery for the progress bar 
    $("#msform").children("#f3").hide();
    $("#submitButton").hide();
    this.current_fs = $(this).parent();
    this.next_fs = $(this).parent().prev();
    $("#progressbar li").eq(2).removeClass("active");
    $("#msform").children("#f2").show();
  }
}


@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span class="example-pizza-party">
  You have been registered!
</span>`,
  styles: []
})
export class SubmitComponent{}