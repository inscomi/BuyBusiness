import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SettingComponent } from './setting/setting.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ChatComponent } from './chat/chat.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddBannerComponent } from './add-banner/add-banner.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SocialLoginComponent } from './social-login/social-login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'authentication',
    component: AuthenticationComponent
  },
  {
    path: 'category-list/:categoryID',
    component: CategoryListComponent
  },
  {
    path: 'category-detail/:productPostingID',
    component: CategoryDetailComponent
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent
  },
  {
    path: 'my-profile',

    component: MyProfileComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  },
  {
    path: 'add-image',
    component: AddImageComponent
  },
  {
    path: 'user-profile/:username',
    canActivate: [AuthGuard],
    component: UserProfileComponent
  },
  {
    path: 'edit-product/:productPostingID',
    component: EditProductComponent
  },
  {
    path: 'add-banner',
    component: AddBannerComponent
  },
  {
    path:'social-login/:userID',
    component:SocialLoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
