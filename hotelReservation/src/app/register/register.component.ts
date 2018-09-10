import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';
import {accountSetup, personalDetails} from './register.model';
import {FormControl, FormGroupDirective, ValidatorFn, NgForm, FormGroup,Validators, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

  //Regex for patterns
  emailPattern = "^[a-z]+@[a-z]+[.](com|ca)$";
  namePattern = "^[a-zA-Z]{2,13}$";
  numberPattern = "^[0-9]{10,15}$";

  //Required Validators
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  confirmpasswordFormControl = new FormControl('', [
    Validators.required,
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required,
  ]);
  dateBirthFormControl = new FormControl('', [
    Validators.required,
  ]);
  numberControl = new FormControl('', [
    Validators.required,
  ]);
  streetControl = new FormControl('', [
    Validators.required,
  ]);
  postalCodeControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();

  //storing the chip buttons to be used in a list
  availableColors: ChipColor[] = [
    {name: 'none', color: undefined},
    {name: 'Next', color: 'primary'},
    {name: 'Accent', color: 'accent'},
    {name: 'Warn', color: 'warn'}

  ];

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
  //store user inputs here and then pass them to db
  account = new accountSetup();
  personal = new personalDetails();

  
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
  constructor(public snackBar: MatSnackBar) { }

  //this is where we take user data and make an ajax request to the db
  //to register the user 
  openSnackBar(){
    this.snackBar.openFromComponent(SubmitComponent, {duration: 800,
    });
  }

  ngOnInit() {
    console.log('hellot');
    console.log(this.emailFormControl.errors);
  }
  validateFirstnext(email: boolean, requiredEmail: boolean, requiredPassword: boolean, requiredConfirmpassword: boolean){
    console.log(email);
    console.log(requiredEmail);
    console.log(requiredPassword);
    console.log(requiredConfirmpassword);
    
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

      console.log(firstNamerequired);
      console.log(firstNamePattern);
      console.log(lastNamerequired);
      console.log(lastNamePattern);
      console.log(dateOfBirthrequired);
      console.log(telephonerequired);
      console.log(telephonePattern);
      console.log(streetrequired);
      console.log(coderequired);
      console.log(firstNamePattern==null);
      if(!(!firstNamerequired && (firstNamePattern==null) && !lastNamerequired && (lastNamePattern==null) &&
      !dateOfBirthrequired && !telephonerequired && (telephonePattern==null) && !streetrequired && !coderequired)){
        console.log("IN HERE");
        this.isSelectedStep1 = false;
      }
      else if(this.isSelectedStep2){
        this.secondnextCall();
      }
      else if(!firstNamerequired && (firstNamePattern==null) && !lastNamerequired && (lastNamePattern==null) &&
        !dateOfBirthrequired && !telephonerequired && (telephonePattern==null) && !streetrequired && !coderequired){
          console.log("IN HERE 2S");
          this.isSelectedStep2 = true;
      }
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