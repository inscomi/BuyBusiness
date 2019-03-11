import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { DataService } from 'src/app/DataService';
import { ChatService } from "../../chat.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [DatePipe]
})
export class ChatComponent implements OnInit {
  
  isScrolled = false;
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 100;
  userId: {};
  chatId: {};
  userchats: {};
  message: string;
  messages: string[] = [];
  chatForm: FormGroup;
  loggedInUser: {};
  user: {};
  userStatus: {};
  readReceipt: string;
  constructor(private data: DataService, private modalService: NgbModal, private chatService: ChatService, private builder: FormBuilder,private datePipe: DatePipe,private router: Router) {
    this.chatForm = this.builder.group({
      chatMessage: ['', Validators.required],
      chatID : [],
      sender: [],
      receiver: [],
      DateTime: []
    });
   }

  ngOnInit() {
   
    this.loggedInUser = localStorage.getItem("token");
    this.getDetails();
    this.chatService.makeUserOnline(this.loggedInUser);
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log(JSON.stringify(message) + "messagemessagemessagemessage");
        if((<any>message).chatID == (<any>this).chatId){
        this.messages.push(message);
        }
      });
  }

  getUserChats(id,user){
    this.chatId = id;
    this.user = user;
    this.chatService.checkUserStatus(this.user);
    this.chatService.changeUserReadReceipt(this.chatId,this.user);
    this.chatService
      .userStatus()
      .subscribe((status: string) => {
        // console.log('statusstatusstatus' + JSON.stringify(status));
        if((<any>status).status == "Online"){
        this.userStatus = (<any>status).status;
      }else{ this.userStatus = "Offline"; }
      // else{
      //   var statusTime = this.datePipe.transform(status.dateTime, 'MM-dd-yyyy');
      //   console.log("statusTimestatusTimestatusTimestatusTimestatusTime" + statusTime);
      //   this.userStatus = "Online " + this.datediff(this.parseDate(this.curDate), this.parseDate(statusTime));
      // }
      });
    this.data.getUserChats(id).subscribe(res => {
        console.log("this.this.userchats" + JSON.stringify(res));
        this.messages = res;
      });
  }
  onSubmit(){
    this.message = this.chatForm.value.chatMessage;
    this.chatForm.get('chatID').setValue(this.chatId);
    if(this.userStatus == "Online"){
      this.readReceipt = "read";
      }
      else{
      this.readReceipt = "unread";
      }
    var chat = { 'chatId' : this.chatId, 'message' : this.message, 'sender': this.loggedInUser,status: this.readReceipt}
    this.chatService.sendMessage(chat);
    this.message = '';
    this.chatForm.reset();
  }

  getDetails() {
    this.data.getThisUserChats().subscribe(res => { this.userchats = res;
      console.log("resresresresres" + JSON.stringify(res));
      if(res[0] != null){
      var firstChatID = res[0]._id;
      var username = res[0].user[0].username;
      this.getUserChats(firstChatID,username);
      }
    });
  }
  modalLogin(content) {
    this.modalService.open(content, { centered: true });
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
