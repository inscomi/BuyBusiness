import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AddImageComponent } from './add-image/add-image.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryMapComponent } from './category-map/category-map.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from '../auth/header/header.component';
import { FooterComponent } from '../auth/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGalleryModule } from 'ngx-gallery';
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ChatComponent } from './chat/chat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatCheckboxModule,MatOptionModule,MatSelectModule, MatBottomSheetModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SettingComponent } from './setting/setting.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { GrdFilterPipe } from '../filter.pipe';
@NgModule({
  imports: [
    LayoutRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    NgbModule,
    NgxGalleryModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    GoTopButtonModule,
    MatBottomSheetModule,
    GooglePlaceModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDbv1G4By2RxzBMsulo1CND6XVh8ZtzJL4', //Google API key for  //old:AIzaSyAFgM81Qz-SwfTzUsr4F51AgDj0HdN88CQ
      libraries: ["places"]
    })
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    AddImageComponent,
    CategoryDetailComponent,
    CategoryDetailComponent,
    CategoryListComponent,
    CategoryMapComponent,
    HomeComponent,
    ChatComponent,
    MyProfileComponent,
    SettingComponent,
    GrdFilterPipe
  ],
})
export class LayoutModule { 
}
