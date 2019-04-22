import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatBottomSheet } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [DatePipe]
})
export class MyProfileComponent implements OnInit {
  userdetail: any;
  title:{};
  responseData: any;
  EmailVerify: FormGroup;
  Emailsave = localStorage.getItem('token');
  Token = localStorage.getItem('token');
  modal: any;
  emailResponse: any;
  closeResult: string;
  coinDetails: any[];
  length: [];
  noOfCoins: {};
  userId: {};
  userCoins: {};
  coinplans: {};
  selectedcoinPlan: {};
  coinPlanForm: FormGroup;
  promotionForm: FormGroup;
  loggedInUser: {};
  currentPosition = 1;
  productImage: {};
  coinPromotions: {};
  selectedPromotion: {};
  titleName: {};
  url: {};
  followings: {};
  followers: {};
  followingLength = 0;
  followersLength = 0;
  myDate: {};
  currentDate: {};
  validCoinPromotions: {};
  comments: {};
  constructor(private data: DataService,private datePipe: DatePipe, private router: Router, private bottomSheet: MatBottomSheet, private modalService: NgbModal, private formBuilder: FormBuilder,private route: ActivatedRoute) {
    this.coinPlanForm = this.formBuilder.group({
      planName: ['', Validators.required],
      user: ['', Validators.required],
      paidFor: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', Validators.required],
      noOfCoins: [''],
    });
    this.promotionForm = this.formBuilder.group({
      ProductId: ['', Validators.required],
      user: ['', Validators.required],
      PromotionId: ['', Validators.required],
      title: ['', Validators.required],
      PromotionType: ['', Validators.required],
      expiryDate: [''],
      status: ['', Validators.required],
      views: [''],
      viewed: [''],
    });
  }
  getProd() {

  }

  openBottomSheet(title): void {
    console.log("get listing clicked data" + title)
    // this.bottomSheet.open(EditProductComponent);
    // this.route.params.subscribe(params => {
    //   this.data.getDetail(params.categoryID).subscribe(res => { this.productlist = res });
    // });
  }
  ngOnInit() {
    this.getListOfCoinPromotions();
    this.EmailVerify = this.formBuilder.group({
      emailverifycode: ['', Validators.required]
    });
    this.getDetails();
    this.getListOfCoinPlans();
    this.url = './assets/img/user-img.png';
    this.loggedInUser = localStorage.getItem("token");
    this.myDate = this.datePipe.transform(new Date(), 'MM-dd-yyyy');
    this.currentDate = Date.now();
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
    this.data.getCoinPromotions().subscribe(res => {
      (<any>this).coinPromotions = res;
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
  getListOfCoinPlans() {
    this.data.getCoinPlans().subscribe(res => { this.coinplans = res;
      (<any>this).coinplans.forEach(item => {
        item.expiryDate = this.datePipe.transform(item.expiryDate, 'MM-dd-yyyy');
        item.expiryDay = this.datediff(this.parseDate(this.myDate), this.parseDate(item.expiryDate));
        });
    });
  }
  deleteProduct() {
    this.userdetail.splice(this.userdetail._id);
  }
  onSend() {
    if (this.EmailVerify.invalid) {
      return;
    }
    this.data.emailVerify(this.EmailVerify.value).subscribe(res => {
      // this.toastr.success('Verification Successfull');
    })
    this.EmailVerify.reset();
  }
  reSend() {
    this.data.emailResend(this.EmailVerify.value).subscribe(res => {

    })
  }
  CoinModal(content, userID) {
    this.userId = userID;
    this.data.getOneUser(this.userId).subscribe(res => {
      if ((<any>res).Coins) {
        this.userCoins = (<any>res).Coins;
      }
      else {
        this.userCoins = 0;
      }
    });
    this.modalService.open(content, { centered: true });
  }
  getDetails() {
    this.data.getProfile().subscribe(res => {
    this.userdetail = res;
      this.userCoins = 0;
      if ((<any>this).userdetail.userProfile.Coins && (<any>this).userdetail.userProfile.Coins != "") {
        this.userCoins = (<any>this).userdetail.userProfile.Coins;
      }
      if ((<any>this).userdetail.userProfile.images) {
        this.url = (<any>this).userdetail.userProfile.images[0].imageName;
      }
      else {
        this.url = './assets/img/user-img.png';
      }
    });
    this.data.getFollowingsCount(this.Token).subscribe(res => {
      this.followingLength = (<any>res).length;
      this.followings = (<any[]>res);
    });
    this.data.getFollowersCount(this.Token).subscribe(res => {
      this.followersLength = (<any>res).length;
      this.followers = (<any>res);
    });
    this.loggedInUser = localStorage.getItem("token");
    this.data.getThisUserComments(this.loggedInUser).subscribe(res => { this.comments = res });
  }
  modalDelete(content) {
    this.modalService.open(content, { centered: true });
  }
  modalPromote(promote, selectedProductImage) {
    this.currentPosition = 1;
    this.productImage = selectedProductImage;
    this.modalService.open(promote, { centered: true });
  }

  modalLogin(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ENTER';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  buyCoin(coinId) {
    this.loggedInUser = localStorage.getItem("token");
    this.data.listOneCoinplan(coinId).subscribe(res => {
      this.selectedcoinPlan = res;
      this.coinPlanForm.value.planName = coinId;
      this.coinPlanForm.value.user = this.loggedInUser;
      this.coinPlanForm.value.paidFor = 'coin';
      this.coinPlanForm.value.noOfCoins = (<any>this).selectedcoinPlan.noOfCoins + this.userCoins;
      this.coinPlanForm.value.type = 'Buy';
      this.coinPlanForm.value.amount = (<any>this).selectedcoinPlan.amount;
    });
    this.data.postTransaction(this.coinPlanForm.value).subscribe(res => {
      this.data.postUpdateUser(this.coinPlanForm.value).subscribe(res => {
        alert("coin purchased successfully");
        this.router.navigate(['/my-profile']);
        window.location.reload();
      });
    });
  }

  promoteThisProduct(selectedPromotion, title, coinpromotion) {
    this.loggedInUser = localStorage.getItem("token");
    if (selectedPromotion == 'Spotlight') {
      this.data.getTitleRelatedToCategory(title.catID).subscribe(res => {
        this.titleName = (<any>res).titleName;
        this.promotionForm.value.ProductId = title.productPostingID;
        this.promotionForm.value.user = this.loggedInUser;
        this.promotionForm.value.PromotionId = coinpromotion._id;
        this.promotionForm.value.title = this.titleName;
        this.promotionForm.value.PromotionType = 'homepage spotlight';
        this.promotionForm.value.expiryDate = coinpromotion.expiryDate;
        this.promotionForm.value.status = true;
        this.promotionForm.value.views = coinpromotion.numberOfCoupons;
        this.promotionForm.value.viewed = 0;
        this.promotionForm.value.noOfCoins = (<any>this).userCoins - coinpromotion.noOfCoins;
        this.data.postPromoteProduct(this.promotionForm.value).subscribe(res => {
          this.data.postUpdateUser(this.promotionForm.value).subscribe(res => {
            alert("Product promoted successfully");
            this.router.navigate(['/my-profile']);
            window.location.reload();
          });
        });
      });
    }
    else if (selectedPromotion == 'Highlight') {
      this.promotionForm.value.ProductId = title.productPostingID;
      this.promotionForm.value.user = this.loggedInUser;
      this.promotionForm.value.expiryDate = coinpromotion.expiryDate;
      this.promotionForm.value.PromotionType = true;
      this.promotionForm.value.views = coinpromotion.numberOfCoupons;
      this.promotionForm.value.viewed = 0;
      this.promotionForm.value.noOfCoins = (<any>this).userCoins - coinpromotion.noOfCoins;
      this.data.postUpdateProduct(this.promotionForm.value).subscribe(res => {
        this.data.postUpdateUser(this.promotionForm.value).subscribe(res => {
          alert("Product highlight purchased successfully");
          this.router.navigate(['/my-profile']);
          window.location.reload();
        });
      });
    }
  }
  bumpThisProduct(title,days,numberOfCoins){
    var expiryDt = new Date();
    var setexpiryDt = expiryDt.setDate(expiryDt.getDate() + days);
    var newexpiryDt = new Date(setexpiryDt);
    this.promotionForm.value.ProductId = title.productPostingID;
    this.promotionForm.value.user = this.loggedInUser;
    this.promotionForm.value.expiryDate = newexpiryDt;
    this.promotionForm.value.PromotionType = true;
    this.promotionForm.value.noOfCoins = (<any>this).userCoins - numberOfCoins;
    this.data.postUpdateProductBump(this.promotionForm.value).subscribe(res => {
      this.data.postUpdateUser(this.promotionForm.value).subscribe(res => {
        alert("Product Bump purchased successfully");
        // this.router.navigate(['/my-profile']);
        window.location.reload();
      });
    });
  }
  nextPage(curPosition, clicked) {
    this.selectedPromotion = clicked;
    this.currentPosition = curPosition + 1;
  }
  previousPage(curPosition) {
    this.currentPosition = curPosition - 1;
  }
}
