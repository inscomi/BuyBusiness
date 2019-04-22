import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: "app-add-image",
  templateUrl: "./add-image.component.html",
  styleUrls: ["./add-image.component.scss"]
})
export class AddImageComponent implements OnInit {
  urls: any[];

  imageLength = 0;
  menu: any[] = [];
  formfield: any[];
  returnUrl: string;
  SubCategory: any;
  CategoryName: any;
  CategoryID: any;
  subCategoryID: any;
  addForm: FormGroup;
  submitted = false;
  selectedFile = null;
  countNum = 0;
  currentPosition = 1;
  states: {};
  countries: {};
  countryId: {};
  cities: {};
  IsNativeAdHome = function () {
    this.countNum++;
    return this.countNum;
  }
  mimetype: any;

  videoupload: boolean;
  imageupload: boolean;

  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
        var str = file.type;
        this.mimetype = str.slice(0, 5);
        if (this.mimetype == "video") {
          this.videoupload = true;
        }
        else {
          this.videoupload = false;
        }
        if (this.mimetype == "image") {
          this.imageupload = true;
        }
        else {
          this.imageupload = false;
        }
      }

    }

  }

  constructor(private data: DataService, private builder: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.addForm = this.builder.group({
      productTitle: ["", Validators.required],
      productCost: [" ", Validators.required],
      productDescription: ["", Validators.required],
      country:["",Validators.required],
      region:["",Validators.required],
      city:["",Validators.required],
      pincode:["",Validators.required]
    });
  }

  onClickMe() {
    this.imageLength = this.urls.length;
    if (this.imageLength >= 0 && this.imageLength <= 4) {
      this.toastr.info('Image Uploaded');
      this.currentPosition = 2;
    }
    else {
      this.toastr.warning('Please Upload 4 images');
    }
  }
  sendItems(item, catID) {
    this.currentPosition = 4;
    const obj = {
      "catID": catID,
      "sCatID": item.scatID
    }
    this.subCategoryID = item.scatID;
    // this.data.postDetail(obj).subscribe(res => {
    // });
  }
  sendCategory(value) {
    this.currentPosition = 3;
    this.CategoryName = value.CategoryName;
    this.CategoryID = value.catID;
    this.SubCategory = value.SubCategory;
  }
  ngOnInit() {
    this.getMenulist();
    this.getListOfCountries();
  }
  goBack() {
    if (this.currentPosition > 1) {
      this.currentPosition = this.currentPosition - 1;
    }
  }
  postProduct() {
    this.data.postImage().subscribe(res => {
      this.urls = res;
    });
  }
  getMenulist() {
    var countryId = localStorage.getItem('country');
    this.data.getMenu(countryId).subscribe(res => {
      this.menu = res;
    });
  }
  getListOfCountries(){
    this.data.getCountry().subscribe(res => { this.countries = res;
  });
  }
  getStatesRelatedToCountry(val){
    this.countryId = val;
    this.data.getStates(val).subscribe(res => { this.states = res;
    });
  }
  getCitiesRelatedToCountry(val){
    this.data.getCities(val).subscribe(res => { this.cities = res;
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }

    const postObj = {
      catID: this.CategoryID,
      sCatID: this.subCategoryID,
      productTitle: this.addForm.value.productTitle,
      productDescription: this.addForm.value.productDescription,
      productCost: this.addForm.value.productCost, //Received
      country: this.addForm.value.country,
      region: this.addForm.value.region,
      city: this.addForm.value.city,
      pincode: this.addForm.value.pincode,
      images: []
    }
    for (let indx in this.urls) {
      var imgData = {
        imageData: this.urls[indx],
        imageName: "im.png",
        imageOrderNo: indx
      };
      postObj.images.push(imgData);
    }
    this.data.postData(postObj).subscribe(res => {
      this.toastr.success(' Product Posted !');
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
