import { Component, OnInit } from '@angular/core';
import {NavigationEnd, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { DataService } from 'src/app/DataService';
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
  /*for filter*/ 
  searchText: string = "";
  /*for filter*/ 
  constructor(private data: DataService, private route: ActivatedRoute, private http: HttpClient) { }
  ngOnInit() {
    this.getProd();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
  sendProdDtl(ctID) {
    this.data.getParticular(ctID).subscribe(res => {
      this.productdetail = res;
    });
  }
  getProd() {
    this.route.params.subscribe(params => {
      this.data.getDetail(params.categoryID).subscribe(res => { this.productlist = res });
    });
  }
  
}
