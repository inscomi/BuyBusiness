import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userdetail: any;
  UserProfileName: any;
  currentuserdetail: any;
  Token = localStorage.getItem('token');
  coinplans: {};
  selectedcoinPlan: {};
  productImage: {};
  url: {};
  followed = false;
  followedById: {};
  userId: {};
  followedBy: {};
  followername: {};
  followings: {};
  followers: {};
  loggedInUser: {};
  followingLength = 0;
  followersLength = 0;
  constructor(private data: DataService, private chatService: ChatService, private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder, private toastr: ToastrService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.getDetails();
    this.url = './assets/img/user-img.png';
    this.chatService
      .getFollowers()
      .subscribe((followers: string) => {
        (<any>this).followers.push(followers);
      });
      this.loggedInUser = localStorage.getItem("token");
  }
  getDetails() {
    this.route.params.subscribe( params => { this.UserProfileName = params.username;
    this.data.getUserProfile(this.UserProfileName).subscribe(res => { this.userdetail = res
      if((<any>this).userdetail.userProfile.images){
      this.url = (<any>this).userdetail.userProfile.images[0].imageName;
      }
      else{
        this.url = './assets/img/user-img.png';
      }
    });
    });
    this.data.getProfile().subscribe(res => { this.currentuserdetail = res
      this.followedBy = (<any>this).currentuserdetail.userProfile._id;
      this.followername = (<any>this).currentuserdetail.userProfile.username;
    });
    this.data.getFollowingsCount(this.UserProfileName).subscribe(res => {
      this.followings = res;
      this.followingLength = (<any>res).length;
    });
    this.data.getFollowersCount(this.UserProfileName).subscribe(res => {
      this.followers = res;
      this.followersLength = (<any>res).length;
    });
  }
  follow(){
    this.followed = true;
    var followDetails = { 'userId': this.userdetail.userProfile._id, 'followedBy': this.followedBy, 'username': this.UserProfileName, 'followername': this.followername};
    this.chatService.followUser(followDetails);
  }

}
