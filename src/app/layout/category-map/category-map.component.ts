import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DataService';
import { NavigationEnd, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-category-map',
  templateUrl: './category-map.component.html',
  styleUrls: ['./category-map.component.scss']
})
export class CategoryMapComponent implements OnInit {
  [x: string]: any;
  productlist: any[];
  ctID: any[];
  zoom: number = 11;
  
// initial center position for the map
lat: number = 1.3521;
lng: number = 103.8198;
  message: string;
  productdetail: {};

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
mapClicked($event: MouseEvent) {
  this.markers.push({
    lat: $event.coords.lat,
    lng: $event.coords.lng,
    draggable: true
  });
}

markerDragEnd(m: marker, $event: MouseEvent) {
  console.log('dragEnd', m, $event);
}

markers: marker[] = [
  {
    lat: 1.361616,
    lng: 103.859082,
    label: 'Green Business',
    draggable: false
  },
  {
    lat: 1.365134,
    lng: 103.884317,
    label: 'Set Items',
    draggable: false  
  },
  {
    lat: 1.346771,
    lng: 103.871142,
    label: 'new added mobile',
    draggable: false
  },
  {
    lat: 1.318128,
    lng: 103.838312,
    label: 'agri-4k images',
    draggable: false
  },
  {
    lat: 1.338861,
    lng: 103.821736,
    label: 'sri-new atest',
    draggable: false
  }
]

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

// just an interface for type safety.
interface marker {
lat: number;
lng: number;
label?: string;
draggable: boolean;
}
