import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  addForm: FormGroup;
  submitted = false;
  states: {};
  countries: {};
  countryId: {};
  cities: {};
  title:{};
  constructor(private data: DataService, private builder: FormBuilder,private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {
    this.addForm = this.builder.group({
      productTitle: ["", Validators.required],
      productCost: [" ", Validators.required],
      productDescription: ["", Validators.required],
      country: ["", Validators.required],
      region: ["", Validators.required],
      city: ["", Validators.required],
      pincode: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.getListOfCountries();
    this.getProductFields();
    this.route.params.subscribe(params => {
      console.log(params, 'ManiTest');
    });
  }
  getProductFields(){

  }
  getListOfCountries() {
    this.data.getCountry().subscribe(res => {
    this.countries = res;
    });
  }
  getStatesRelatedToCountry(val) {
    this.countryId = val;
    this.data.getStates(val).subscribe(res => {
    this.states = res;
    });
  }
  getCitiesRelatedToCountry(val) {
    this.data.getCities(val).subscribe(res => {
    this.cities = res;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.data.editProduct(this.addForm.value).subscribe(res => {
      console.log(res);
      this.toastr.success(' Product Posted !');
    });
  }
}
