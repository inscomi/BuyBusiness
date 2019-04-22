import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { endPoint } from 'src/environments/environment';


@Injectable({
  providedIn: "root"
})
export class DataService {
  private _loading: boolean = false;
  token = localStorage.getItem("token");
  countryId = localStorage.getItem('country');
  headers = { "Content-Type": "application/json", Authorization: this.token };
  listings: any;
  userdetail: any;
  constructor(private http: HttpClient) { }

  getTernds() {
    return this.http.get<any[]>( endPoint + "/landing/getTrending");
  }

  delete(selected) {
    return new Promise(resolve => {
      const index = this.userdetail.listings.findIndex(userdetail => userdetail === selected);
      this.userdetail.listings.splice(index, 1);
      resolve(true);
    });
  }

  editProduct(data){
    return this.http.post<any[]>(endPoint + "/product/updateProductPrice",JSON.stringify(data),{ headers: { "Content-Type": "application/json" } });
  }
  register(data) {
    return this.http.post<any[]>("http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/register",JSON.stringify(data),{ headers: { "Content-Type": "application/json" } });
  }
  otpSend(data) {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/PhoneVerification",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  otpVerify(data) {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/verifyPhoneToken",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  otpResend(data) {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/resendPhoneVerification",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  emailVerify(data) {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/emailverifyupdate",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  emailResend(data) {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/resendemailverify",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  login(data) {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/login",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  postImage() {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/product/newProduct",
      { headers: { "Content-Type": "application/json" } }
    );
  }
  deleteIndex() {
    return this.http.put<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/product/initMapping",
      { headers: { "Content-Type": "application/json" } }
    );
  }
  postDetail(obj) {
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/product/fieldDetails",
      JSON.stringify(obj),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  getBusiness() {
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/landing/getGrid"
    );
  }
  getMenu(countryId) {
    return this.http.get<any[]>("http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/home/Menu/" + countryId);
  }
  getData() {
    return this.http.get<any[]>("http://192.168.0.107:3000/title/findtitle");
  }
  getFresh(countryId) {
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/landing/getFresh/" + countryId
    );
  }
  getMainBanners(){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/adbanner/getAdBanner/main');
  }
  getTopSubBanners(){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/adbanner/getAdBanner/topsub');
  }
  getBottomSubBanners(){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/adbanner/getAdBanner/bottomsub');
  }
  postBanner(postObj){
    this.token = localStorage.getItem("token");
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/adbanner/newAdBanner",
      JSON.stringify(postObj),
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  getTitle(countryID) {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/title/listtitle/' + countryID);
  }
  getCategory(countryID, titleID) {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/category/listcategory/' + countryID + '/' + titleID);
  }
  getSubCategory(categoryId) {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/subcategory/listscategory/' +  categoryId);
  }
  getListingBanners(){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/adbanner/getAdBanner/listing');
  }
  getHomepageBanners(){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/adbanner/getAdBanner/home');
  }
  getDetail(ctID) {
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/listing/show/" + ctID
    );
  }
  getParticular(productPostingID) {
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/listing/getProduct/" + productPostingID
    );
  }
  getProfile() {
    this.countryId = localStorage.getItem('country');
    this.token = localStorage.getItem("token");
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/profile/",
      { headers: { "Content-Type": "application/json", userid: this.token, countryId: this.countryId } }
    );
  }
  getUserProfile(username){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/userprofile/" + username
    );
  }
  getFollowingsCount(username){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/follows/getFollowings/" + username
    );
  }
  getFollowersCount(username){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/follows/getFollowers/" + username
    );
  }
  postData(postObj) {
    this.token = localStorage.getItem("token");
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/product/newProduct",
      JSON.stringify(postObj),
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  getThisUserChats(){
    this.token = localStorage.getItem("token");
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/chat/getThisUserChats/",
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  getUserChats(chatId){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/userchat/listMessage/" + chatId
    );
  }
  changeRoomStatus(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/chatroom/changeRoomStatus', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  getUserComments(productId){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/productcomment/listcomment/" + productId
    );
  }
  getThisUserComments(username){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/productcomment/listUsercomment/" + username
    );
  }
  getTitleRelatedToCategory(catId){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/category/getTitleRelatedToCategory/" + catId
    );

  }
  getProductPromotions(countryId){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/promotion/getPromotion/" + countryId
    );
  }
  postPromoteProduct(obj){
    this.token = localStorage.getItem("token");
    return this.http.post<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/promotion/newPromotion",
      JSON.stringify(obj),
      { headers: { "Content-Type": "application/json", userid: this.token } }
    );
  }
  postTransaction(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/transaction/new', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postUpdateUser(obj) {
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/updateuser', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  updateProductPromotionViewed(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/promotion/updatepromotion', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  updateProductHighlightViewed(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/product/updateproducthighlightviewed', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  disableProductPromotion(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/promotion/disablepromotion', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postUpdatePassword(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/updatePassword', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postProfileSettings(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/updateprofile', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  listOneCoinplan(coinplanId) {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/coinplan/listOne/' + coinplanId);
  }
  getCoinPlans() {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/coinplan/viewcoinplans');
  }
  getOneUser(userId){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/user/getOneUser/' +  userId);
  }
  getUserCoinDetails(userID){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/transaction/find/" + userID
    );
  }
  getProductChat(productId){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/chat/getThisProductChats/" + productId
    );
  }
  checkThisUserChat(user,product){
    return this.http.get<any[]>(
      "http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/chat/checkThisUserChat/" + user + '/' + product
    );
  }
  postInitiateChat(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/chat/initiate', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postInitiateChatRoom(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/chatroom/newroom', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  postChatMessage(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/userchats/newMessage', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  getCoinPromotions(){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/coinpromotion/viewcoinpromotions');
  }
  postUpdateProduct(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/product/updateProduct', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
  getCountry() {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/country/findcountry');
  }
  getStates(countryID) {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/state/findstate/' + countryID);
  }
  getCities(stateID) {
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/city/findcity/' + stateID);
  }
  getCountryIdByName(countryname){
    return this.http.get<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/country/findcountrybyname/' + countryname);
}
postUpdateProductBump(obj){
    return this.http.post<any[]>('http://ec2-3-1-222-182.ap-southeast-1.compute.amazonaws.com:3000/product/updateProductBump', JSON.stringify(obj), { headers: { 'Content-Type': 'application/json' } });
  }
}
