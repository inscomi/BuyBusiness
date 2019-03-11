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
      this.socket = io('https://bbrevampv2.herokuapp.com',{
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

}
