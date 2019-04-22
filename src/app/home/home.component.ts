import { Component, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";
import { DataService } from '../data.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ChatService } from '../chat.service';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [NgbCarouselConfig, DatePipe]
})
export class HomeComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  /* ARRAY DECLARATION*/
  Bgrid: {};
  freshFindings: {};
  trendingSearch: {};
  promotionSearch: {};
  menu: any[] = [];
  adbanners: {};
  adbannersLength = 0;
  adtopbannersLength = 0;
  adbottombannersLength = 0;
  adtopbanners: {};
  adbottombanners: {};
  currentDate: {};
  countryId: {};
  bumpedProduct: {};
  homepageTop: any[];
  homepageBottom: any[];
  homepageMain: any[];
  homepageRightTop: any[];
  homepageRightBottom: any[];
  /* ARRAY DECLARATION*/

  /* BOOLEAN DECLARATION*/
  isScrolled = false;
  productDetails: false;
  isActive = false;
  show = true;
  /* BOOLEAN DECLARATION*/

  /* INT DECLARATION*/
  currPos: Number = 0;
  startPos: Number = 0;
  changePos: Number = 100;
  /* INT DECLARATION*/

  /* OWL CAROUSEL DECLARATION*/
  customOptions: any = {
    items: 1,
    loop: true,
    navSpeed: 100,
    autoPlay: 5000,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    nav: true,
    dots: false,
    autoplay: true,
  }
  EightGrid: any = {
    items: 8,
    rows: 2,
    slideBy: 2,
    loop: true,
    navSpeed: 100,
    autoPlay: 5000,
    dots: false,
    autoplay: true,
  }
  mainBanner: any = {
    items: 1,
    loop: true,
    navSpeed: 200,
    autoPlay: 1000,
    autoplay: true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
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
        items: 3
      },
      940: {
        items: 4
      }
    },
  }
  addisplayBanner: any = {
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
  btdisplayBanner: any = {
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
  trendingProducts: any = {
    items: 1,
    nav: true,
    loop: true,
    navSpeed: 500,
    autoPlay: 10,
    autoplay: true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 1
      },
      451: {
        items: 3,
      },
      500: {
        items: 3,
      },
      600: {
        items: 4,
      },
      740: {
        items: 5,
      },
      991: {
        items: 7,
      },
      1100: {
        items: 7
      }
    },
    dots: false,
  }

/* OWL CAROUSEL DECLARATION*/

  constructor(private data: DataService,config: NgbCarouselConfig,private datePipe: DatePipe, private chatService: ChatService) {
    config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
  }
  ngOnInit() {
    this.getBuss();
    this.getPopular();
    this.getMenulist();
    this.getTrend();
    this.getPromotions();
    this.getAdBanners();
    this.currentDate = Date.now();
    this.countryId = localStorage.getItem('country');
    var searchData = [];
    this.chatService
      .getSearchResult()
      .subscribe((data: any) => {
        console.log("data elastic" + JSON.stringify(data.hits));
        // this.data = data.hits;
        if(data.hits){
        (<any>data).hits.forEach( (item,index) => {
          console.log("item item " + JSON.stringify(item));
          item._source.coverimage = item._source.images[0].imageName;
          searchData.push(item._source);
        });
        this.freshFindings = searchData;
      }else{
        this.getPopular();
      }
      });
  }
  // getAdBanners(){
  //   this.data.getMainBanners().subscribe(res => { this.adbanners = res;
  //     this.adbannersLength = (<any>res).length;
  //    });
  //    this.data.getTopSubBanners().subscribe(res => { this.adtopbanners = res;
  //      this.adtopbannersLength = (<any>res).length;
  //     });
  //     this.data.getBottomSubBanners().subscribe(res => { this.adbottombanners = res;
  //       this.adbottombannersLength = (<any>res).length;
  //      });
  // }
  getBuss() {
    this.data.getBusiness().subscribe(res => { this.Bgrid = res });
  }
  getMenulist() {
    var countryId = localStorage.getItem('country');
    this.data.getMenu(countryId).subscribe(res => { this.menu = res;
    });
  }


  getPopular() {
    var countryId = localStorage.getItem('country');
    this.data.getFresh(countryId).subscribe(res => { this.freshFindings = (<any>res).data;

      (<any>this).freshFindings.forEach( (item,index) => {
        console.log("productPostTime" + item.productPostTime);
        if(item.productHighlight){
        var curDate = new Date((<any>this).currentDate);
        var highlightExpiryDate = new Date(item.productPromoteExpiry);
        if(item.productHighlightViewed >= item.productHighlightViews ||curDate > highlightExpiryDate){
          item.productHighlight = false;
        }
      }
      });
      this.data.updateProductHighlightViewed(this.freshFindings).subscribe(res => {
      });
    });
  }
  getAdBanners(){
    this.data.getHomepageBanners().subscribe(res => { this.adbanners = res;
      // this.adbannersLength = (<any>res).length;
      this.homepageTop = [];
      this.homepageBottom = [];
      this.homepageMain = [];
      this.homepageRightTop = [];
      this.homepageRightBottom = [];
      (<any>this).adbanners.forEach( (item,index) => {
        if(item.type == 'homepageTop'){ this.homepageTop.push(item.images); }
        else if(item.type == 'homepageBottom'){ this.homepageBottom.push(item.images); }
        else if(item.type == 'homepageMain'){ this.homepageMain.push(item.images); }
        else if(item.type == 'homepageRightTop'){ this.homepageRightTop.push(item.images); }
        else if(item.type == 'homepageRightBottom'){ this.homepageRightBottom.push(item.images); }
      });
     });
  }
  getTrend() {
     this.data.getTernds().subscribe(res => { this.trendingSearch = res });
  }
  getPromotions(){
    var countryId = localStorage.getItem('country');
    this.data.getProductPromotions(countryId).subscribe(res => {
      this.promotionSearch = res;
      (<any>this).promotionSearch.forEach( (item,index) => {
        var curDate = new Date((<any>this).currentDate);
        var spotlightExpiryDate = new Date(item.expiryDate);
        if(item.viewed >= item.views || curDate > spotlightExpiryDate){
          var obj = { 'promotionId': item.id }
          this.data.disableProductPromotion(obj).subscribe(res => {
            console.log("update after result" + JSON.stringify(res));
          });
        }
        else{

        }
      });
      this.data.updateProductPromotionViewed(this.promotionSearch).subscribe(res => {
        console.log("update after result" + JSON.stringify(res));
      });
    });
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
