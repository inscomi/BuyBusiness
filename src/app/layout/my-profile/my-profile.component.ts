import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/DataService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  userdetail: any;
  responseData: any;
  EmailVerify: FormGroup;
  Emailsave = localStorage.getItem('token');
  Token = localStorage.getItem('token');
  modal: any;
  emailResponse: any;
  closeResult: string;
  coinDetails: any[];
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
  constructor(private data: DataService, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService) {
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
    });
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
  }
  getListOfCoinPlans() {
    this.data.getCoinPlans().subscribe(res => {
      console.log("this.res" + res); this.coinplans = res;
    });
  }
  deleteProduct(){
    this.userdetail.splice(this.userdetail._id);
    console.log('asdasdasd')
  }
  onSend() {
    if (this.EmailVerify.invalid) {
      return;
    }
    this.data.emailVerify(this.EmailVerify.value).subscribe(res => {
      // this.userdetail.userProfile.emailverified;
      // this.emailResponse = res;
      this.toastr.success('Verification Successfull');
      // this.modal.dismiss('Cross click');
      // this.modal.close('Verify click')
      // window.location.reload();
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
      if((<any>res).Coins){
        this.userCoins = (<any>res).Coins;
        }
        else{
        this.userCoins = 0;
        }
    });
    this.modalService.open(content, { centered: true });
  }
  getDetails() {
    this.data.getProfile().subscribe(res => { this.userdetail = res
      if((<any>this).userdetail.userProfile.images){
      this.url = (<any>this).userdetail.userProfile.images[0].imageName;
      }
      else{
        this.url = './assets/img/user-img.png';
      }
      // this.positive = (<any>this).userdetail.userProfile.Positive ? (<any>this).userdetail.userProfile.Positive : 0;
      // this.negative = (<any>this).userdetail.userProfile.Negative ? (<any>this).userdetail.userProfile.Negative : 0;
      // this.neutral = (<any>this).userdetail.userProfile.Neutral ? (<any>this).userdetail.userProfile.Neutral : 0;
      if(this.userdetail.userProfile.Coins){
        this.userCoins = this.userdetail.userProfile.Coins;
      }
      else{
        this.userCoins = 0;
      }
    });
    this.data.getFollowingsCount(this.Token).subscribe(res => {
      this.followings = res;
      console.log("resresresres" + JSON.stringify(res));
    });
    this.data.getFollowersCount(this.Token).subscribe(res => {
      this.followers = res;
      console.log("resresresres" + JSON.stringify(res));
    });
  }
  modalDelete(content){
    this.modalService.open(content, { centered: true });
  }
  modalPromote(promote, selectedProductImage){
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
      console.log('asdasdas');
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
      console.log(this.coinPlanForm.value.noOfCoins);
      this.data.postUpdateUser(this.coinPlanForm.value).subscribe(res => {
        alert("coin purchased successfully");
        this.router.navigate(['/my-profile']);
      });
    });
  }

  promoteThisProduct(selectedPromotion,title,coinpromotion){
    this.loggedInUser = localStorage.getItem("token");
    if(selectedPromotion == 'Spotlight'){
    console.log("productIdproductId" + title.productPostingID + " title.catID" + title.catID);
    this.data.getTitleRelatedToCategory(title.catID).subscribe(res => {
      console.log("resresresres" + JSON.stringify(res));
      this.titleName = (<any>res).titleName;
    this.promotionForm.value.ProductId = title.productPostingID;
    this.promotionForm.value.user = this.loggedInUser;
    this.promotionForm.value.PromotionId = coinpromotion._id;
    this.promotionForm.value.title = this.titleName;
    this.promotionForm.value.PromotionType = 'homepage spotlight';
    this.promotionForm.value.expiryDate = coinpromotion.expiryDate;
    this.promotionForm.value.status = true;
    this.promotionForm.value.views = 0;
    this.promotionForm.value.noOfCoins = (<any>this).userCoins - coinpromotion.noOfCoins;
    this.data.postPromoteProduct(this.promotionForm.value).subscribe(res => {
      this.data.postUpdateUser(this.promotionForm.value).subscribe(res => {
        alert("Product promoted successfully");
        this.router.navigate(['/my-profile']);
      });
    });
    });
  }
  else if(selectedPromotion == 'Highlight'){
    this.promotionForm.value.ProductId = title.productPostingID;
    this.promotionForm.value.user = this.loggedInUser;
    this.promotionForm.value.expiryDate = coinpromotion.expiryDate;
    this.promotionForm.value.PromotionType = true;
    this.promotionForm.value.noOfCoins = (<any>this).userCoins - coinpromotion.noOfCoins;
    this.data.postUpdateProduct(this.promotionForm.value).subscribe(res => {
      this.data.postUpdateUser(this.promotionForm.value).subscribe(res => {
        alert("Product highlight purchased successfully");
        this.router.navigate(['/my-profile']);
      });
    });
  }
  }
  getListOfCoinPromotions(){
    this.data.getCoinPromotions().subscribe(res => { console.log("this.res" + res); (<any>this).coinPromotions = res;
    // (<any>this).coinPromotions.forEach(item => {
    //   item.expiryDate = this.datePipe.transform(item.expiryDate, 'MM-dd-yyyy');
    //   item.expiryDate = this.datediff(this.parseDate(this.myDate), this.parseDate(item.expiryDate));
    //   // this.data.getPromotionImage(item._id).subscribe(res => { console.log(res);
    //   //   item.image = (<any>this).sanitizer.bypassSecurityTrustResourceUrl("data:Image/*;base64," + (<any>res).image);
    //   // });
    //   });
  });
  }
  nextPage(curPosition,clicked){
    this.selectedPromotion = clicked;
    this.currentPosition = curPosition + 1;
  }
  previousPage(curPosition){
    this.currentPosition = curPosition - 1;
  }
  // profileRating(type,count){
  //   this.
  //   var likedCount = count + 1;
  //   var rating = { 'type' : type, 'count' : this.message, 'sender': this.loggedInUser,status: this.readReceipt}
  // }
}
