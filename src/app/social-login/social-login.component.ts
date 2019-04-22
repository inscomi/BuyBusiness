import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {
  returnUrl: string;
  showProfile = false;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      var localUserID = params.userID;
      if (localUserID.split('~~').length == 1) {
        //Valid User
        localStorage.setItem('token', localUserID);
        localStorage.setItem('signup', 'done');
        this.router.navigateByUrl(this.returnUrl);

        this.showProfile = true;
        window.location.reload();
      }
      else {
        //Should Navigate to signup with Email id as auto filled
        var userEmailid = localUserID.split('~~')[2];
        localStorage.setItem('newUser', userEmailid);
        this.router.navigateByUrl(this.returnUrl);
        window.location.reload();
        //You should Navigate to User signup page


        //Email ID should be auto filled.
      }

    });
  }

}
