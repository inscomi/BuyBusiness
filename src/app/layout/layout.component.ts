import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { ViewChild, ElementRef, NgZone, } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('places') places: GooglePlaceDirective;
  @ViewChild('search') public searchElement: ElementRef;
  SowNotefication: boolean = false;
  lat: number = 26.765844;
  lng: number = 83.364944;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }
  public handleAddressChange(address: Address) {
    console.log(address.geometry.location.lng());
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.toJSON());
    console.log(address.geometry.viewport.getNorthEast());
    this.lng = address.geometry.location.lng();
    this.lat = address.geometry.location.lat();
  }
  ngOnInit() {
  }

}
