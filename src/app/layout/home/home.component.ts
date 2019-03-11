import { Component, OnInit } from "@angular/core";
import { HostListener } from "@angular/core";
import { DataService } from "src/app/DataService";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  /* ARRAY DECLARATION*/
  Bgrid: {};
  freshFindings: {};
  trendingSearch: {};
  promotionSearch: {};
  menu: any[] = [];
  /* ARRAY DECLARATION*/

  /* BOOLEAN DECLARATION*/
  isScrolled = false;
  productDetails: false;
  isActive = false;
  show = false;
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
        items: 4,
      },
      600: {
        items: 5,
      },
      740: {
        items: 5,
      },
      940: {
        items: 7
      }
    },
    dots: false,
  }

/* OWL CAROUSEL DECLARATION*/

  constructor(private data: DataService) {
  }
  ngOnInit() {
    this.getBuss();
    this.getPopular();
    this.getMenulist();
    this.getTrend();
    this.getPromotions();
  }
  getBuss() {
    this.data.getBusiness().subscribe(res => { this.Bgrid = res });
  }
  getMenulist() {
    this.data.getMenu().subscribe(res => { this.menu = res });
  }
  getPopular() {
    this.data.getFresh().subscribe(res => { this.freshFindings = res });
  }

  getTrend() {
    this.data.getTernds().subscribe(res => { this.trendingSearch = res });
  }
  getPromotions(){
    this.data.getProductPromotions().subscribe(res => {
      console.log("promotion result ======" + JSON.stringify(res));
      this.promotionSearch = res
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
