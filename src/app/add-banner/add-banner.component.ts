import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
  providers: [DatePipe]
})
export class AddBannerComponent implements OnInit {
  subBannerForm: FormGroup;
  promotionForm: FormGroup;
  bannerPosition: {};
  coinPromotions: {};
  loggedInUser: {};
  url: any[];
  urls: any[];
  mimetype : any;
  videoupload : boolean ;
    imageupload : boolean ;
    bannerType: {};
    userId: {};
    userCoins: {};
    currentPosition = 1;
    categoryShow = false;
    countryId: '';
  titleId: '';
  categoryId: '';
  subcategoryId: any[];
  categories: any[];
  titles: any[];
  subcategories: any[];
  myDate: {};
  currentDate: {};
  validCoinPromotions: {};
  userdetail: {};
  constructor(private data: DataService,private datePipe: DatePipe,private formBuilder: FormBuilder) {
    this.subBannerForm = this.formBuilder.group({
      position: ['', Validators.required],
      title: [''],
      category: [''],
      subcategory: [''],
    });
    this.promotionForm = this.formBuilder.group({
      user: [''],
      noOfCoins: [''],
    });
  }

  ngOnInit() {
    this.getListOfCoinPromotions();
    var countryId = localStorage.getItem('country');
    this.getTitleRelatedToCountry(countryId);
    this.myDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
    this.currentDate = Date.now();
    this.getDetails();
    // this.subcategoryId = [];
  }
  getDetails(){
    this.data.getProfile().subscribe(res => {
    this.userdetail = res;
    this.userId = (<any>this).userdetail.userProfile._id;
      this.userCoins = 0;
      if ((<any>this).userdetail.userProfile.Coins && (<any>this).userdetail.userProfile.Coins != "") {
        this.userCoins = (<any>this).userdetail.userProfile.Coins;
      }
    });
  }
  getTitleRelatedToCountry(countryId){
    this.countryId = countryId;
    this.data.getTitle(countryId).subscribe(res => { this.titles = res;
    });
  }
  getCategoryRelatedToTitle(val){
    this.titleId = val;
    this.data.getCategory(this.countryId,val).subscribe(res => { this.categories = res;
    });
  }
  getCategoryId(val){
    this.categoryId = val;
    this.data.getSubCategory(this.categoryId).subscribe(res => { this.subcategories = res;
    });
  }
  getSubCategoryId(val){
    this.subcategoryId = [];
    // this.subcategoryId = val;
    // for (let subid of val) {
    //
    //   this.subcategoryId.push(val[subid]);
    // }
    this.subcategoryId.push(val);
    console.log("subidsubidsubidsubid" + this.subcategoryId);
  }
  goBack(){
    this.currentPosition = 1;
  }
  modalBuy(Buycontent,type){
    this.currentPosition = 2;
    this.data.getOneUser(this.userId).subscribe(res => {
      if ((<any>res).Coins) {
        this.userCoins = (<any>res).Coins;
      }
      else {
        this.userCoins = 0;
      }
    });
    this.bannerType = type;
    // this.modalRef = this.modalService.open(Buycontent, { centered: true });
  }
  parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
}

  datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second-first)/(1000*60*60*24));
  }
  getListOfCoinPromotions() {
    this.data.getCoinPromotions().subscribe(res => { console.log("this.res" + res); (<any>this).coinPromotions = res;
    this.validCoinPromotions = res;
    // (<any>this).coinPromotions.forEach((item,index) => {
    //   var curDate = new Date((<any>this).currentDate);
    //   var coinPromotionsExpiryDate = new Date(item.expiryDate);
    //   if(curDate > coinPromotionsExpiryDate){
    //     // (<any>this).coinPromotions.splice(index,1);
    //   }else{
    //   (<any>this).validCoinPromotions.push(item);
    //   item.expiryDate = this.datePipe.transform(item.expiryDate, 'MM-dd-yyyy');
    //   item.expiryDay = this.datediff(this.parseDate(this.myDate), this.parseDate(item.expiryDate));
    //   }
    //   });
  });
  }
  getPosition(val){
    this.bannerPosition = val;
    if(val == 'listingTop' || val == 'listingBottom' || val == 'listingRight'){
      this.categoryShow = true;
    }
  }
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          var img = new Image();
          img.src = e.target.result;
          this.urls.push(e.target.result);
          this.url = e.target.result;
          img.onload = function () {
            // this.selectedImageWidth = this.width;
            // this.selectedImageHeight = this.height;
            // console.log("w" + w + "h" + h + "this.width" + this.width + "this.height" + this.height);
            // if(w > this.width || h > this.height){
            //   this.stopUploading = true;
            //   this.resolutionError = "Please select image in selected resolution";
            // }
            // else{
            //   this.stopUploading = false;
            //   this.resolutionError = "";
            // }
          }
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
  postBanner(promotion){
    // if(this.bannerType == "mainBanner"){
    //   var position = "center";
    //   var promotionType = 'MainBanner'
    // }
    // else{
    console.log("this.subcategoryId" + this.subcategoryId);
      var position = this.bannerPosition;
      console.log("position" + position);
      var promotionType = 'Banner'
    // }
    this.loggedInUser = localStorage.getItem("token");
    this.promotionForm.value.user = this.loggedInUser;
    this.promotionForm.value.noOfCoins = (<any>this).userCoins - promotion.noOfCoins;
    const postObj = {
      username: this.loggedInUser,
      PromotionId: promotion._id,
      PromotionType: promotionType,
      position: position,
      expiryDate: promotion.expiryDate,
      status: 1,
      views: 0,
      category: this.categoryId,
      subcategory: [],
      images: []
    }
    // postObj.subcategory.push(this.subcategoryId);
    for (let subcatid in this.subcategoryId) {
      var subCatData = {
        subCatId: this.subcategoryId[subcatid]
      };
      postObj.subcategory.push(subCatData);
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
    console.log("postObj" + JSON.stringify(postObj));
    this.data.postBanner(postObj).subscribe(res => {
      this.data.postUpdateUser(this.promotionForm.value).subscribe(res => {
        alert('Banner Image added successfully');
        // window.location.reload();
      });
      // this.router.navigate(['/home']);
    });
  }

}
