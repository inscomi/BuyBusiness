import { Component, OnInit, Injectable } from '@angular/core';
import { HostListener } from "@angular/core";
import { NavigationEnd, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  currentJustify = 'justified';
  navNone = false;
  Loginform: FormGroup;
  SignupForm: FormGroup;
  [x: string]: any;
  menu: any[] = [];
  closeResult: string;
  printdata: any;
  responseData: any;
  otpStatus: any;
  /* ARRAY DECLARATION*/

  /* BOOLEAN DECLARATION*/
  submitted = false;
  isScrolled = false;
  error: boolean;
  popUp = false;
  showProfile = false;
  showTimer = false;
  isCollapsed = true;
  navHide = false;
  /* BOOLEAN DECLARATION*/

  /* LOCAL STORAGE DECLARATION*/
  SignupStatus = localStorage.getItem('signup');
  newEmailID = localStorage.getItem('newUser');
  Token = localStorage.getItem('token');
  /* LOCAL STORAGE DECLARATION*/

  /*SCOLL VALUE DECLARATION*/
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 50;
  timeLeft = 60;
  interval;
  /*SCOLL VALUE DECLARATION*/

  indexCode: any;
  Country = [{ 'name': 'Bangladesh', 'dial_code': '+880', 'id': 0 }, { 'name': 'India', 'dial_code': '+91', 'id': 1 }, { 'name': 'Malaysia', 'dial_code': '+60', 'id': 2 }, { 'name': 'Singapore', 'dial_code': '+65', 'id': 3 }, { 'name': 'Thailand', 'dial_code': '+66', 'id': 4 }, { 'name': 'Philippines', 'dial_code': '+63', 'id': 5 }]
  returnUrl: '/add-image';
  HideStatus = 1;
  url: {};
  constructor(private router: Router, private formBuilder: FormBuilder, private data: DataService, private toastr: ToastrService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(res => {
        if (this.router.url == "/authentication") {
          this.navNone = true;
        }
        else {
          this.navNone = false;
        }
      });
      /*Loginform*/
      this.Loginform = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required]],

      });
      /*Loginform*/
      this.SignupForm = this.formBuilder.group({
        email: [this.newEmailID, Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        country: ['', [Validators.required]],
        phone_number: ['', [Validators.required]],
        country_code: ['']
      });
      this.OtpVerification = this.formBuilder.group({
        token: ['', Validators.required]
      })
  }

  onSignin() {
    this.submitted = true;
    if (this.Loginform.invalid) {
      return;
    }
    this.data.login(this.Loginform.value).subscribe(res => {
      if (res['Authenticated'] == true) {
        var token = res['username'];
        localStorage.removeItem('token');
        localStorage.setItem('token', token);
        this.Token = localStorage.getItem('token');
        localStorage.setItem('signup', 'done');
        this.toastr.success('Login Successfull');
        this.router.navigateByUrl('');
        // window.location.reload();
      }
      else {
        localStorage.removeItem('token');
        this.Token = null;
        this.toastr.warning('Login Failed');
      }
    });
  }

  onSignup() {
    this.submitted = true;
    if (this.SignupForm.invalid) {
      return;
    }
    this.SignupForm.patchValue({
      country: 'India',//this.Country[this.indexCode].name,
      countrycode: '+91'//this.Country[this.indexCode].dial_code
    })

    this.data.register(this.SignupForm.value).subscribe(res => {
      this.responseData = res;
      var token = res['username'];
      localStorage.removeItem('token');
      localStorage.setItem('token', token);
      this.Token = localStorage.getItem('token');
      localStorage.setItem('signup', 'done');
      this.SignupStatus = localStorage.getItem('signup')
      this.HideStatus = 2;
      if (this.responseData.status == 'success') {
        this.toastr.success(this.responseData.status);
        this.router.navigate(['/my-profile']);
      }
      else {
        localStorage.removeItem('token');
        this.Token = null;
        this.toastr.warning('SignUp Failed');
        window.location.reload();
      }
    });
  }

  DialCode(index) {
    this.indexCode = index;
    this.DialIndex = this.Country[index].dial_code;
  }

  OnOpt() {

    this.SignupForm.patchValue({
      country: this.Country[this.indexCode].name,
      country_code: this.Country[this.indexCode].dial_code
    })
    this.data.otpSend(this.SignupForm.value).subscribe(res => {

    })
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft --;
        this.showTimer = true;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }

  sendOtp() {
    this.data.otpVerify(this.OtpVerification.value).subscribe(res => {
      this.otpStatus = res;
      if (this.otpStatus.success) {
        this.toastr.success('OTP Verified');
        this.OtpVerification.onSubmit(null);
        this.modalRef.close();
        this.modal.dismiss;
      }
      this.OtpVerification.reset();
    })
  }
  reSend() {
    this.data.otpResend(this.OtpVerification.value).subscribe(res => {

    })
  }

}
