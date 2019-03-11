import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'buybusiness';
  lat: number = 26.765844;
  lng: number = 83.364944;
  constructor(private router: Router, ) { }
  loading = true;
  visible = true;
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
      this.loading=false;
    });
  }

}
