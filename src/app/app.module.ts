import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatCheckboxModule, MatOptionModule, MatSelectModule, MatBottomSheetModule } from '@angular/material';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryMapComponent } from './category-map/category-map.component';
import { SettingComponent } from './setting/setting.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { AddImageComponent } from './add-image/add-image.component';
import { ChatComponent } from './chat/chat.component';
import { GrdFilterPipe } from './filter.pipe';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SocialLoginComponent } from './social-login/social-login.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    CategoryMapComponent,
    SettingComponent,
    MyProfileComponent,
    AddImageComponent,
    ChatComponent,
    GrdFilterPipe,
    EditProductComponent,
    AddBannerComponent,
    UserProfileComponent,
    AuthenticationComponent,
    SocialLoginComponent,
  ],
  imports: [
    CarouselModule,
    HttpClientModule,
    NoopAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    GoTopButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    NgxGalleryModule,
    MatBottomSheetModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: true,
      easeTime: 400,
      closeButton: true
    }),
    NgbModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [
    EditProductComponent
  ],
  providers: [AuthGuard,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
