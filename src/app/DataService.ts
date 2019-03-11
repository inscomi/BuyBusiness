import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class DataService {
  token = localStorage.getItem("token");
  headers = { "Content-Type": "application/json", Authorization: this.token };
  constructor(private http: HttpClient) { }
  register(data) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/user/register",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  otpSend(data) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/user/PhoneVerification",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  otpVerify(data) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/user/verifyPhoneToken",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  otpResend(data) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/user/resendPhoneVerification",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  emailVerify(data) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/user/emailverifyupdate",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  emailResend(data) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/user/resendemailverify",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  login(data) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/user/login",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  postImage() {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/product/newProduct",
      { headers: { "Content-Type": "application/json" } }
    );
  }
  postDetail(obj) {
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/product/fieldDetails",
      JSON.stringify(obj),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  getBusiness() {
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/landing/getGrid"
    );
  }
  getMenu() {
    return this.http.get<any[]>("https://bbrevampv2.herokuapp.com/home/Menu");
  }
  getData() {
    return this.http.get<any[]>("http://192.168.0.107:3000/title/findtitle");
  }
  getFresh() {
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/landing/getFresh"
    );
  }
  getTernds() {
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/landing/getTrending"
    );
  }
  getDetail(ctID) {
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/listing/show/" + ctID
    );
  }
  getParticular(productPostingID) {
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/listing/getProduct/" + productPostingID
    );
  }
  getProfile() {
    this.token = localStorage.getItem("token");
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/user/profile/",
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  getUserProfile(username){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/user/userprofile/" + username
    );
  }
  getFollowingsCount(username){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/follows/getFollowings/" + username
    );
  }
  getFollowersCount(username){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/follows/getFollowers/" + username
    );
  }
  postData(postObj) {
    this.token = localStorage.getItem("token");
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/product/newProduct",
      JSON.stringify(postObj),
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  getThisUserChats(){
    this.token = localStorage.getItem("token");
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/chat/getThisUserChats/",
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  getUserChats(chatId){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/userchat/listMessage/" + chatId
    );
  }
  getUserComments(productId){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/productcomment/listcomment/" + productId
    );
  }
  getTitleRelatedToCategory(catId){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/category/getTitleRelatedToCategory/" + catId
    );
  }
  getProductPromotions(){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/promotion/getPromotion/"
    );
  }
  postPromoteProduct(obj){
    this.token = localStorage.getItem("token");
    return this.http.post<any[]>(
      "https://bbrevampv2.herokuapp.com/promotion/newPromotion",
      JSON.stringify(obj),
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  postTransaction(obj){
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/transaction/new', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postUpdateUser(obj) {
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/user/updateuser', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postUpdatePassword(obj){
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/user/updatePassword', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postProfileSettings(obj){
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/user/updateprofile', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  listOneCoinplan(coinplanId) {
    return this.http.get<any[]>('https://bbrevampv2.herokuapp.com/coinplan/listOne/' + coinplanId);
  }
  getCoinPlans() {
    return this.http.get<any[]>('https://bbrevampv2.herokuapp.com/coinplan/viewcoinplans');
  }
  getOneUser(userId){
    return this.http.get<any[]>('https://bbrevampv2.herokuapp.com/user/getOneUser/' +  userId);
  }
  getUserCoinDetails(userID){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/transaction/find/" + userID
    );
  }
  getProductChat(productId){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/chat/getThisProductChats/" + productId
    );
  }
  checkThisUserChat(user,product){
    return this.http.get<any[]>(
      "https://bbrevampv2.herokuapp.com/chat/checkThisUserChat/" + user + '/' + product
    );
  }
  postInitiateChat(obj){
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/chat/initiate', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postInitiateChatRoom(obj){
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/chatroom/newroom', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postChatMessage(obj){
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/userchats/newMessage', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  getCoinPromotions(){
    return this.http.get<any[]>('https://bbrevampv2.herokuapp.com/coinpromotion/viewcoinpromotions');
  }
  postUpdateProduct(obj){
    return this.http.post<any[]>('https://bbrevampv2.herokuapp.com/product/updateProduct', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
}
