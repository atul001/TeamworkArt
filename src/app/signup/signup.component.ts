import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public isExists = false;
  public otp = 0;
  public isValidOTP = -1;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Signup(val) {
    if(val.username && val.password)
    {
    var obj = localStorage.getItem(val.username);
    if (obj == null) {
      val.active = false;
      this.otp = Math.floor(100000 + Math.random() * 900000);
      val.otp = this.otp;
      localStorage.setItem(val.username, JSON.stringify(val));
    
    }
    else {
      this.isExists = true;
    }
  }
     
  }

  ValidateOTP(val) {
    var obj = localStorage.getItem(val.username);
    
    if (obj != null) {
      var objParse = JSON.parse(obj);
      if (objParse.otp == val.otp) {
        this.isValidOTP = 1;
        val.active = true;
        val.otp = null;
        localStorage.setItem(val.username, JSON.stringify(val));
      }
      else {
        this.isValidOTP = 0;
      }
    }
  }
}