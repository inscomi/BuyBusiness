import { Component, OnInit } from "@angular/core";
import { DataService } from 'src/app/DataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-gallery";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-category-detail",
  templateUrl: "./category-detail.component.html",
  styleUrls: ["./category-detail.component.scss"],
  providers: [NgbDropdownConfig]
})
export class CategoryDetailComponent implements OnInit {
  [x: string]: any;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  productdetail: any;
  freshFindings: {};
  productPostingID:any;
  isCollapsed = true;
  productPostingId: {};
  loggedInUser: {};
  chatInitiated = false;
  show = false;
  // images:any[];
  constructor(private data: DataService, private router: Router,config: NgbDropdownConfig, private modalService: NgbModal, private route: ActivatedRoute, private http: HttpClient) {
    config.placement = 'bottom-right';
    config.autoClose = true;
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

    this.galleryImages = [
      // {
      //   small: "https://bbrevampv2.herokuapp.com/listing/getImage/{{productdetail.imageName}}",
      //   medium: "assets/img/lr.jpg",
      //   big: "assets/img/lr.jpg"
      // },
      // {
      //   small: "assets/img/lr2.jpg",
      //   medium: "assets/img/lr2.jpg",
      //   big: "assets/img/lr2.jpg"
      // },
      // {
      //   small: "assets/img/lr3.jpg",
      //   medium: "assets/img/lr3.jpg",
      //   big: "assets/img/lr3.jpg"
      // },
      // {
      //   small: "assets/img/lr2.jpg",
      //   medium: "assets/img/lr2.jpg",
      //   big: "assets/img/lr2.jpg"
      // },
      // {
      //   small: "assets/img/lr.jpg",
      //   medium: "assets/img/lr.jpg",
      //   big: "assets/img/lr.jpg"
      // }
    ];
  }
  getDetails() {
    this.route.params.subscribe(params => {
      console.log(params, 'ManiTest');
      this.productPostingId = params.productPostingID;
      this.data.getParticular(params.productPostingID).subscribe(res => {
      this.productdetail = res;
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
      });
    }
    );
  }

  productChat(){
    this.data.getProfile().subscribe(res => {
      var userid = (<any>res).userProfile._id;
      var username = (<any>res).userProfile.username;
      var chatObj = {
        'userid' : userid,
        'username' : username,
        'receiverId' : this.productdetail.productPostedBy._id,
        'receiverUsername' : this.productdetail.productPostedBy.username,
        'productId' : this.productPostingId
      }
      var users = [userid,this.productdetail.productPostedBy._id];
      var usernames = [username,this.productdetail.productPostedBy.username];
      var userType = ['Sender','Receiver'];
      this.data.postInitiateChat(chatObj).subscribe(res => {
        var lastInsertedId = (<any>res)._id;
        for (var user in users) {
          var userid = { 'userid': users[user],'username': usernames[user], 'chatroomId': lastInsertedId, 'usertype': userType[user] };
          this.data.postInitiateChatRoom(userid).subscribe(res => {

          });
        }
        // this.router= Router;
        // this.router.navigateByUrl('chat');
        this.router.navigate(['/chat']);
        // this.router.navigate(['/chat']);
      });
    });
  }

  getPopular() {
    this.data.getFresh().subscribe(res => { this.freshFindings = res });
    this.isActive = !this.isActive;
  }
  modalLogin(content) {
    this.modalService.open(content, { centered: true });
  }
}
