import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  url = '';
  editProfile: FormGroup;
  changePassword: FormGroup;
  submitted = false;
  returnUrl: string;
  userdetail: {};
  urls: any[];
  mimetype : any;
    videoupload : boolean ;
    imageupload : boolean ;
    userProfileId: {};
    error: {};
    userPassword: {};
    states: {};
    countries: {};
    countryId: {};
    cities: {};
  constructor(private data: DataService, private bottomSheet: MatBottomSheet, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.editProfile = this.formBuilder.group({
      profileId: [''],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      webSite: ['', Validators.required],
      about: ['', Validators.required],
      country: ['',Validators.required],
      region: ['',Validators.required],
      city: ['',Validators.required],
      privateName: ['',Validators.required],
      privateFirstName: ['',Validators.required],
      PrivateCity: ['',Validators.required]
    });

    this.changePassword = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });

    this.getDetails();
    this.getListOfCountries();
  }
  getListOfCountries(){
    this.data.getCountry().subscribe(res => { this.countries = res;
  });
  }
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.url = e.target.result;
        }
        reader.readAsDataURL(file);
        var str = file.type;
        this.mimetype = str.slice(0, 5);
        if(this.mimetype == "video"){
             this.videoupload = true;
        }
             else{
              this.videoupload = false;
             }
         if (this.mimetype == "image"){
          this.imageupload = true;
        }
        else {
          this.imageupload = false;
        }
      }

    }

  }

  getDetails() {
    this.data.getProfile().subscribe(res => { this.userdetail = res;
      this.userProfileId = (<any>this).userdetail.userProfile._id;
      this.userPassword = (<any>this).userdetail.userProfile.password;
      if((<any>this).userdetail.userProfile.images[0]){
      this.url = (<any>this).userdetail.userProfile.images[0].imageName;
      }
      this.editProfile.patchValue({
          userName: (<any>this).userdetail.userProfile.username,
          firstName: (<any>this).userdetail.userProfile.firstname,
          lastName: (<any>this).userdetail.userProfile.lastname,
          webSite: (<any>this).userdetail.userProfile.website,
          about: (<any>this).userdetail.userProfile.aboutyourself,
          country: (<any>this).userdetail.userProfile.country,
          region: (<any>this).userdetail.userProfile.region,
          city: (<any>this).userdetail.userProfile.city,
          privateName: (<any>this).userdetail.userProfile.privateusername,
          privateFirstName: (<any>this).userdetail.userProfile.privatefirstname,
          PrivateCity: (<any>this).userdetail.userProfile.privatecity
        });
      // this.editProfile.userName.value = this.userdetail.userProfile.username;
      // if(this.userdetail.userProfile.Coins){
      //   this.userCoins = this.userdetail.userProfile.Coins;
      // }
      // else{
      //   this.userCoins = 0;
      // }
    });
  }
  getStatesRelatedToCountry(val){
  
    this.countryId = val;
    this.data.getStates(val).subscribe(res => { this.states = res;
   
    });
  }
  getCitiesRelatedToCountry(val){
   
    this.data.getCities(val).subscribe(res => { this.cities = res;
   
    });
  }
  onSend(){
    const postObj = {
      profileId: this.userProfileId,
      userName: this.editProfile.value.userName,
      firstName: this.editProfile.value.firstName,
      lastName: this.editProfile.value.lastName,
      webSite: this.editProfile.value.webSite,
      about: this.editProfile.value.about, //Received
      country: this.editProfile.value.country, //Received
      region: this.editProfile.value.region, //Received
      city: this.editProfile.value.city, //Received
      privateName: this.editProfile.value.privateName, //Received
      privateFirstName: this.editProfile.value.privateFirstName, //Received
      PrivateCity: this.editProfile.value.PrivateCity, //Received
      images: []
    }

    for (let indx in this.urls) {
      var imgData = {
        imageData: this.urls[indx],
        imageName: "im.png",
        imageOrderNo: indx,
        mediatype :this.mimetype
      };
      postObj.images.push(imgData);
    }
    this.data.postProfileSettings(postObj).subscribe(res => {
      this.toastr.success(' Profile updated !');
      this.router.navigateByUrl(this.returnUrl);
    });
  }

  submitPassword(){
    var oldPassword = this.changePassword.value.oldPassword;
    var newPassword = this.changePassword.value.newPassword;
    var confirmPassword = this.changePassword.value.passwordRepeat;

    if(newPassword != confirmPassword){
      this.error = "New password and confirm password mismatch";
    }
    else if(oldPassword != this.userPassword){
      this.error = "Your current password is wrong";
    }
    else{
    const postObj = {
      profileId: this.userProfileId,
      oldPassword: oldPassword,
      newPassword: newPassword,
      passwordRepeat: confirmPassword
    }
    this.data.postUpdatePassword(postObj).subscribe(res => {
      this.toastr.success(' Password updated !');
      this.router.navigateByUrl(this.returnUrl);
    });
    }
  }

  openBottomSheet(): void {
    this.bottomSheet.open(SettingComponent);
  }
  // onSend() {
  //   this.submitted = true;
  // }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); 

      // reader.onload = (event) => { 
      //   this.url = event.target.result;
      // }
    }
  }


}
