import { Component, OnInit, Injectable } from '@angular/core';
import { HostListener } from "@angular/core";
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';
@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  ModalRef: NgbModalRef;
  /* FORM DECLARATION*/
  SignupForm: FormGroup;
  Loginform: FormGroup;
  searchForm: FormGroup;
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
  constructor(public modalService: NgbModal, private formBuilder: FormBuilder, private data: DataService, private router: Router, private http: HttpClient, private toastr: ToastrService, private chatService: ChatService) {
    this.indexCode = 0;
    // this.Token = localStorage.getItem('token');
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
    this.searchForm = this.formBuilder.group({
      searchElement: ['', Validators.required]
    });
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
    this.url = 'assets/img/user-img.png';
    this.getMenulist();
    this.Token = localStorage.getItem('token');
    if (this.Token) {
      this.getDetails();
    }
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(res => {
      if (this.router.url == "/chat" ) {
        this.navExpand = true;
      }
      else {
        this.navExpand = false;
      }
      if(this.router.url =="/authentication"){
        this.navHide = true;
      }
      else{
        this.navHide = false;
      }
    });
      this.data.deleteIndex().subscribe(res => {
        console.log("successfullly deleted");
      });

  }

  searchSubmit(){
    let searchElement = this.searchForm.value.searchElement;
    let filterQuery = {
      text: searchElement,
      page: 0
    }
    this.chatService.searchProduct(filterQuery);
  }
  getDetails() {
    this.data.getProfile().subscribe(res => {
    this.userdetail = res;
      if ((<any>this).userdetail.userProfile.images[0] == "" || (<any>this).userdetail.userProfile.images[0] == null) {
        this.url = 'assets/img/user-img.png';
      }
      else {
        this.url = (<any>this).userdetail.userProfile.images[0].imageName;
      }
    });
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

  LogOut() {
    this.chatService.makeUserOffline(this.Token);
    localStorage.removeItem('token');
    this.SignupStatus = localStorage.getItem('signup');
    this.Token = localStorage.getItem('token');
    this.toastr.info('Loged Out !');
    this.router.navigateByUrl('/home');
  }
  getMenulist() {
    var countryId = localStorage.getItem('country');
    this.data.getMenu(countryId).subscribe(res => { this.menu = res });
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
    window.location.href = 'http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/auth/facebook';
  }
  google() {
    window.location.href = 'http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/auth/google';
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
