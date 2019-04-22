import * as io from 'socket.io-client';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class ChatService {

    // private url = 'http://localhost:3000';
    private socket;

    constructor() {
      // https://bbrevampv2.herokuapp.com
      this.socket = io('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000',{
      });
    //   var token = localStorage.token;
    // var socket = io.connect('http://localhost:3000', {
    //   // headers: { "Content-Type": "application/json", userid: this.token },
    //   transports: ['websocket'],
    //   secure: true,
    //   rejectUnauthorized: false,
    //   // path: '/chat/socket'
    //   query: {token: token}
    // });
    }

    public sendMessage(message) {
        this.socket.emit('message', message);
    }

    public followUser(followDetails){
      this.socket.emit('followUser', followDetails);
    }

    public postComment(comment){
      this.socket.emit('postComment', comment);
    }

    public sendLikes(likeCount){
        this.socket.emit('likeHit', likeCount);
    }

    public updateProductViews(productPostingId){
      this.socket.emit('updateProductViews', productPostingId);
    }

    public searchProduct(searchElement){
      this.socket.emit('searchProduct', searchElement);
    }

    public filterProduct(filterQuery){
      this.socket.emit('filterProduct', filterQuery);
    }

    public makeUserOnline(user) {
        this.socket.emit('makeUserOnline', user);
    }

    public makeUserOffline(user){
        this.socket.emit('makeUserOffline', user);
    }

    public changeUserReadReceipt(chatId,user){
        var changeStatus = {'chatId': chatId, 'userId': user};
        this.socket.emit('changeUserReadReceipt', changeStatus);
      }

    public checkUserStatus(user) {
        this.socket.emit('checkUserStatus', user);
    }

    public userStatus = () => {
      return Observable.create((observer) => {
          this.socket.on('userStatus', (status) => {
              observer.next(status);
          });
      });
    }

    public getMessages = () => {
        return Observable.create((observer) => {
            this.socket.on('message', (message) => {
                observer.next(message);
            });
        });
    }

    public getLikes = () => {
        return Observable.create((observer) => {
            this.socket.on('getLike', (likes) => {
                observer.next(likes);
            });
        });
    }

    public getSearchResult = () => {
      return Observable.create((observer) => {
          this.socket.on('getSearchResult', (data) => {
            console.log(data)
              observer.next(data);
          });
      });
  }

    public getComments = () => {
        return Observable.create((observer) => {
            this.socket.on('getComment', (comments) => {
                observer.next(comments);
            });
        });
    }

    public getFollowers = () => {
        return Observable.create((observer) => {
            this.socket.on('getFollowers', (followers) => {
                observer.next(followers);
            });
        });
    }

}
