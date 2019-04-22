import { Component, OnInit } from '@angular/core';
import {NavigationEnd, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../data.service';
import { ChatService } from '../chat.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  [x: string]: any;
  productlist: any[];
  ctID: any[];
  message: string;
  productdetail: {};
  sortBy: any = 'popular';
  minPrice: any = '';
  maxPrice: any = '';
  searchName: any = '';
  /*for filter*/
  searchText: string = "";
  adbanners: any[];
  catID: number;
  listingTop: any[];
  listingRight: any[];
  listingBottom: any[];
  currentDate: {};
  productlistLength: {};
  /*for filter*/
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
  rightBanner: any = {
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
  constructor(private data: DataService, private route: ActivatedRoute, private http: HttpClient, private chatService: ChatService) { }
  ngOnInit() {
    this.getProd();
    this.getAdBanners();
    this.bumpTheProduct();
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     return;
    //   }
    //   window.scrollTo(0, 0)
    // });
    this.currentDate = Date.now();
    this.chatService
      .getSearchResult()
      .subscribe((data: any) => {
        let searchData = [];
        console.log("data elastic" + JSON.stringify(data.hits));
        // this.data = data.hits;
        if(data.hits){
        (<any>data).hits.forEach( (item,index) => {
          console.log("item item " + JSON.stringify(item));
          item._source.coverimage = item._source.images[0].imageName;
          searchData.push(item._source);
        });
        this.productlist = searchData;
      }else{
        this.getProd();
      }
      });
  }

  filterProduct(val){
    let filterQuery = {
      sortBy: this.sortBy,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      text: this.searchName,
      page: 0
    }
    this.chatService.filterProduct(filterQuery);
  }

  bumpTheProduct(){
    interval(1000000).subscribe(x => this.updateExampleText());
    // $interval(this.updateExampleText(), 1000, 5);
  }
  sendProdDtl(ctID) {
    this.data.getParticular(ctID).subscribe(res => {
      this.productdetail = res;
    });
  }
  getProd() {
    this.route.params.subscribe(params => {
      this.catID = params.categoryID;
      this.data.getDetail(params.categoryID).subscribe(res => { this.productlist = res;
        this.productlistLength = (<any>this).productList.length;
        (<any>this).productlist.forEach( (item,index) => {
          if(item.productHighlight){
          var curDate = new Date((<any>this).currentDate);
          var highlightExpiryDate = new Date(item.productPromoteExpiry);
          if(curDate > highlightExpiryDate){
            item.productHighlight = false;
          }
        }
        });
       });
    });
  }
  updateExampleText(){
    console.log("inside the function");
    this.data.getDetail(this.catID).subscribe(res => { this.productlist = res;
      console.log("first");
      (<any>this).productlist.forEach( (item,index) => {
      if(item.productBump){
      var curDate = new Date((<any>this).currentDate);
      var highlightExpiryDate = new Date(item.productBumpExpiry);
      if(curDate > highlightExpiryDate){
        item.productBump = false;
      }
      else{
        this.bumpedProduct = item;
        (<any>this).productlist.splice(index,1);
        (<any>this).productlist.unshift(item);
        // item.pop();
      }
      }
      });
     });
  }
  getAdBanners(){
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
        if(subcategories.includes(this.catID)){
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
  }

}
