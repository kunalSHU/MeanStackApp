import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {MatSnackBar} from '@angular/material';

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
  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(){
    this.snackBar.openFromComponent(SubmitComponent, {duration: 500,
    });
  }

  ngOnInit() {
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
}


@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span class="example-pizza-party">
  Pizza party!!! 🍕
</span>`,
  styles: []
})
export class SubmitComponent{}