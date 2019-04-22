import { Component, OnInit } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";

@Component({
  selector: "app-category-detail",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.scss"]
})
export class CategoryDetailComponent implements OnInit {
  [x: string]: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  productdetail: any;
  freshFindings: {};
  productPostingID: any;
  isCollapsed = true;
  productPostingId: {};
  loggedInUser: {};
  chatInitiated = false;
  chatCount: {};
  show = false;
  liked = false;
  likes: {};
  commentForm: FormGroup;
  comments: {};
  listingTop: any[];
  listingRight: any[];
  listingBottom: any[];
  productPostedUsername: any[];
  // images:any[];
  //START-OWL
  topBanner: any = {
    items: 1,
    loop: true,
    navSpeed: 200,
    autoPlay: 1000,
    autoplay: true,
    //navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
  bottomBanner: any = {
    items: 1,
    loop: true,
    navSpeed: 200,
    autoPlay: 1000,
    autoplay: true,
    //navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  }
  //END-OWL
  constructor(private data: DataService, private chatService: ChatService, private router: Router, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient, private builder: FormBuilder) {
    this.commentForm = this.builder.group({
      comment: ['', Validators.required],
      productID: [],
      sender: [],
      receiver: [],
      DateTime: []
    });
  }
  ngOnInit() {
    this.chatInitiated = true;
    this.loggedInUser = localStorage.getItem("token");
    this.getDetails();
    this.getPopular();
    this.galleryOptions = [
      {
        width: "100%",
        height: "400px",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: "100%",
        height: "600px",
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [];
    this.getComments();
    this.chatService
      .getLikes()
      .subscribe((likes: string) => {
        this.likes = likes;
      });
    this.chatService
      .getComments()
      .subscribe((comments: string) => {
        if (this.productPostingId == (<any>comments).productId) {
          (<any>this).comments.push(comments);
        }
      });
  }
  LikeHit(likeCount) {
    this.liked = true;
    var likeInc = likeCount + 1;
    var product = { 'productId': this.productPostingId, 'likes': likeInc };
    this.chatService.sendLikes(product);
  }
  getDetails() {
    this.route.params.subscribe(params => {

      this.productPostingId = params.productPostingID;
      this.data.getParticular(params.productPostingID).subscribe(res => {
        this.productdetail = res;
        this.productPostedUsername = this.productdetail.productPostedBy.username;
        this.likes = this.productdetail.productLikes;
        for (var imgIndx in this.productdetail.images) {
          var imgData = this.productdetail.images[imgIndx];
          // "https://bbrevampv2.herokuapp.com/listing/getImage/"+
          var imgGalary = {
            small: imgData.imageName,
            medium: imgData.imageName,
            big: imgData.imageName
          };
          this.galleryImages.push(imgGalary);
        }
        if (this.productdetail.productPostedBy.username == this.loggedInUser) {
          this.data.getProductChat(params.productPostingID).subscribe(res => {

            this.chatCount = (<any>res).count;
          });
        }
        this.data.getListingBanners().subscribe(res => { this.adbanners = res;
          console.log("listingToplistingTop" + JSON.stringify(this.adbanners));
          this.listingTop = [];
          this.listingRight = [];
          this.listingBottom = [];
          (<any>this).adbanners.forEach( (item,index) => {
            console.log(item.subcatId[0].subCatId.split(',') + this.catID);
            var subcategories = [];
            var str = item.subcatId[0].subCatId;
            subcategories = str.split(',');
            if(subcategories.includes(this.productdetail.sCatID)){
              console.log(true);
              if(item.type == 'listingTop'){
              this.listingTop.push(item.images); }else if(item.type == 'listingBottom'){
                this.listingBottom.push(item.images);
              }
              else if(item.type == 'listingRight'){
                this.listingRight.push(item.images);
              }
              console.log("listingToplistingTop" + JSON.stringify(this.listingTop));
            }
            else{
              console.log(false);
            }
          });
          // this.adbannersLength = (<any>res).length;
         });
      });
      this.data.getUserComments(this.productPostingId).subscribe(res => { this.comments = res });
      // var obj = { 'productPostingId': this.productPostingId };
      this.chatService.updateProductViews(this.productPostingId);
      // this.data.postUpdateProductViews().subscribe(res => { this.comments = res });
    }
    );
  }
  onSubmit() {
    this.comment = this.commentForm.value.comment;
    this.commentForm.get('productID').setValue(this.productPostingId);
    var comment = { 'productId': this.productPostingId, 'comment': this.comment, 'sender': this.loggedInUser, 'status': 1, 'username': this.productPostedUsername }
    this.chatService.postComment(comment);
    this.comment = '';
    this.commentForm.reset();
  }
  redirectToChat() {
    this.router.navigate(['/chat']);
  }
  redirectToDetail(productId) {
    this.galleryImages = [];
    this.router.navigate(['/category-detail', productId]);

  }
  productChat() {
    this.data.getProfile().subscribe(res => {
      var userid = (<any>res).userProfile._id;
      var username = (<any>res).userProfile.username;
      var checkUserChat = { 'user': username, 'productId': this.productPostingId };
      this.data.checkThisUserChat(username, this.productPostingId).subscribe(res => {

        if (res) {
          this.router.navigate(['/chat']);
        }
        else {
          var chatObj = {
            'userid': userid,
            'username': username,
            'receiverId': this.productdetail.productPostedBy._id,
            'receiverUsername': this.productdetail.productPostedBy.username,
            'productId': this.productPostingId
          }
          var users = [userid, this.productdetail.productPostedBy._id];
          var usernames = [username, this.productdetail.productPostedBy.username];
          var userType = ['Sender', 'Receiver'];
          this.data.postInitiateChat(chatObj).subscribe(res => {
            var lastInsertedId = (<any>res)._id;
            for (var user in users) {
              var userid = { 'userid': users[user], 'username': usernames[user], 'chatroomId': lastInsertedId, 'usertype': userType[user] };
              this.data.postInitiateChatRoom(userid).subscribe(res => {

              });
            }
            this.router.navigate(['/chat']);
          });
        }
      });
    });
  }

  getPopular() {
    var countryId = localStorage.getItem('country');
    this.data.getFresh(countryId).subscribe(res => { this.freshFindings = (<any>res).data; });
    this.isActive = !this.isActive;
  }
  getComments() {

  }
  modalContent(content) {
    this.modalService.open(content, { centered: true });
  }
  modalContent1(content) {
    this.modalService.open(content, { centered: true });
  }
}
