import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  loginform: FormGroup;
  SignupForm: FormGroup;
  submitted = false;
  submit = false;
  constructor(private formBuilder: FormBuilder,config: NgbTabsetConfig) {
    config.justify = 'center';
   }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', [Validators.required]],
    });
    this.SignupForm = this.formBuilder.group({
      Signup_Name: ['', Validators.required],
      Signup_Email:['',Validators.required],
      Signup_Password: ['', [Validators.required]],
      Signup_Confirmpassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginform.invalid) {
      return;
    }
  }
  onSubmited() {
    this.submit = true;
    if (this.loginform.invalid) {
      return;
    }
  }
}
