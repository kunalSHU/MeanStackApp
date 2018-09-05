import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  animating: any;
  current_fs: any;
  next_fs: any;
  previous_fs: any;
  left:any;
  opacity:any;
  scale:any;
  constructor() { }

  ngOnInit() {
  }
  nextCall(){
    
    if(this.animating){
      return false;
    }
    this.animating = true;

    //gets the current field set
    this.current_fs =  $(this).parent();
    //gets the next field set
    this.next_fs =  $(this).parent().next();
    console.log(this.current_fs);
    
    console.log(this.next_fs);
    console.log('next was clicked');

    //activate next step on progressbar using the index of next_fs
    console.log($("fieldset").index(this.current_fs));
    console.log($("fieldset").index(this.next_fs));
    $("#progressbar li").eq($("fieldset").index(this.next_fs)).addClass("active");

    this.next_fs.show();
    	//hide the current fieldset with style
	  this.current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        //as the opacity of current_fs reduces to 0 - stored in "now"
        //1. scale current_fs down to 80%
        this.scale = 1 - (1 - now) * 0.2;
        //2. bring next_fs from the right(50%)
        this.left = (now * 50)+"%";
        //3. increase opacity of next_fs to 1 as it moves in
        this.opacity = 1 - now;
        this.current_fs.css({
          'transform': 'scale('+this.scale+')',
          'position': 'absolute'
        });
        this.next_fs.css({'left': this.left, 'opacity': this.opacity});
      }, 
      duration: 800, 
      complete: function(){
        this.current_fs.hide();
        this.animating = false;
      }, 
      //this comes from the custom easing plugin
      easing: 'easeInOutBack'
    });    
  }
}
