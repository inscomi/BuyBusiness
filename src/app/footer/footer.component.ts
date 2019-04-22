import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  countryStatus = localStorage.getItem('country');
  country: string;
  navExpand: boolean;
  FooterHide: boolean;
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(res => {
        if (this.router.url ==  "/authentication") {
          this.navExpand = true;
        }
        else {
          this.navExpand = false;
        }
        if(this.router.url == "/chat"){
          this.FooterHide = true;
        }
        else{
          this.FooterHide = false;
        }
      });
      this.setDefaultCountry();
  }
  setDefaultCountry(){
    if(this.countryStatus == null){
      var countryname = 'India';
      this.data.getCountryIdByName(countryname).subscribe(res => {
        this.country = (<any>res)._id;
        localStorage.removeItem('country');
        localStorage.setItem('country', this.country);
        // window.location.reload();
      });
    }
  }
  selectCountry(country) {
    this.data.getCountryIdByName(country).subscribe(res => {
      this.country = (<any>res)._id;
      localStorage.removeItem('country');
      localStorage.setItem('country', this.country);
      window.location.reload();
    });
  }

}
