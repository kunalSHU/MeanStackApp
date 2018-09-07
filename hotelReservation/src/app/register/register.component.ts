import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';
import {accountSetup, personalDetails} from './register.model';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
  isSelected = false;;

  //For the email text field
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  confirmpasswordFormControl = new FormControl('', [
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

  constructor(public snackBar: MatSnackBar) { }

  //this is where we take user data and make an ajax request to the db
  //to register the user 
  openSnackBar(){
    this.snackBar.openFromComponent(SubmitComponent, {duration: 800,
    });
  }

  ngOnInit() {
    //console.log(this.password.valid);
  }
  test(email: boolean, requiredEmail: boolean, requiredPassword: boolean, requiredConfirmpassword: boolean){
    console.log(email);
    console.log(requiredEmail);
    console.log(requiredPassword);
    console.log(requiredConfirmpassword);
    
    if(this.password != this.confirmpassword){
      this.isSelected = false;
    }
    else if(!(!email && !requiredEmail && !requiredPassword && !requiredConfirmpassword)){
      this.isSelected = false;
    }
    else if(this.isSelected){
      this.firstnextCall();
    }
    else if(!email && !requiredEmail && !requiredPassword && !requiredConfirmpassword){
      if(this.password == this.confirmpassword){
        this.isSelected = true;
      }
      else{
        alert("password mismatch");
      } 
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