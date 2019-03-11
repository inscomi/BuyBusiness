import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { DataService } from 'src/app/DataService';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { ChatService } from "../../chat.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  /* FORM DECLARATION*/
  SignupForm: FormGroup;
  Loginform: FormGroup;
  /* FORM DECLARATION*/

  /* ARRAY DECLARATION*/
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
  isCollapsed = true;
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
  /*SCOLL VALUE DECLARATION*/

  indexCode: any;
  Country = [{ 'name': 'Bangladesh', 'dial_code': '+880', 'id': 0 }, { 'name': 'India', 'dial_code': '+91', 'id': 1 }, { 'name': 'Malaysia', 'dial_code': '+60', 'id': 2 }, { 'name': 'Singapore', 'dial_code': '+65', 'id': 3 }, { 'name': 'Thailand', 'dial_code': '+66', 'id': 4 }, { 'name': 'Philippines', 'dial_code': '+63', 'id': 5 }]
  returnUrl: '/add-image';
  url = '';
  HideStatus = 1;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private data: DataService, private router: Router, private http: HttpClient, private toastr: ToastrService, private chatService: ChatService) {
    this.indexCode = 0;
  }

  ngOnInit() {
    if (this.newEmailID) {
      localStorage.removeItem('newUser');
    } else { this.newEmailID = ''; }
    /*SIGNUP FOMR*/
    this.SignupForm = this.formBuilder.group({
      email: [this.newEmailID, Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      country_code: ['']
    });
    /*SIGNUP FOMR*/
    /*Loginform*/
    this.Loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],

    });
    /*Loginform*/

    this.OtpVerification = this.formBuilder.group({
      token: ['', Validators.required]
    })
    if (this.newEmailID != '') {
      this.toastr.info('Please sign up your user details');
    }
    this.getMenulist();
  }

  sendCategory(ctID) {
    this.data.getDetail(ctID).subscribe(res => {
      this.productlist = res;
    });
  }

  onSignup() {
    this.submitted = true;
    if (this.SignupForm.invalid) {
      return;
    }
    this.SignupForm.patchValue({
      country: this.Country[this.indexCode].name,
      countrycode: this.Country[this.indexCode].dial_code
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
        window.location.reload();
      }
      else {
        localStorage.removeItem('token');
        this.Token = null;
        this.toastr.warning('Login Failed');
      }
    });
  }
CheckChat(){
  var url = window.location;
  if (this.url = '')
    return true
  return false
}
  LogOut() {
    this.chatService.makeUserOffline(this.Token);
    localStorage.removeItem('token');
    this.SignupStatus = localStorage.getItem('signup');
    this.Token = localStorage.getItem('token');
    this.toastr.info('Loged Out !');
    window.location.reload();
    this.router.navigateByUrl('/home');
  }
  getMenulist() {
    this.data.getMenu().subscribe(res => { this.menu = res });
  }
  Onopen(content) {
    if (localStorage.getItem('token') == undefined || localStorage.getItem('token') == '') {
      this.toastr.info('OTP Has Sent To Your Mobile');
      this.modalService.open(content, { centered: true });
    }
    else {
      this.router.navigateByUrl('/add-image');
    }
  }
  faceBook() {
    window.location.href = 'https://bbrevampv2.herokuapp.com/auth/facebook';
  }
  google() {
    window.location.href = 'https://bbrevampv2.herokuapp.com/auth/google';
  }
  modalLogin(content) {
    this.modalRef = this.modalService.open(content, { centered: true });
  }
  modalsigin(logincontent) {
    this.modalRef = this.modalService.open(logincontent, { centered: true });
  }
  modalAd(Adscontent) {
    this.modalRef = this.modalService.open(Adscontent, { centered: true });
  }
  modalBanner(Bannercontent) {
    this.modalRef = this.modalService.open(Bannercontent, { size: 'lg' });
  }
  modalOtp(content) {
    this.modalRef = this.modalService.open(content, { centered: true });
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.profileDetails();
    });
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const currPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (currPos >= this.changePos) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
