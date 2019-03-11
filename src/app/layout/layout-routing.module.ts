import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { HomeComponent } from "./home/home.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryDetailComponent } from "./category-detail/category-detail.component";
import { CategoryMapComponent } from "./category-map/category-map.component";
import { AddImageComponent } from "./add-image/add-image.component";
import { ChatComponent } from "./chat/chat.component";
import { MyProfileComponent } from "./my-profile/my-profile.component";
import { SettingComponent } from "./setting/setting.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "category-list/:categoryID",
        component: CategoryListComponent
      },
      {
        path: "category-detail/:productPostingID",
        component: CategoryDetailComponent
      },
      {
        path: "chat",
        component: ChatComponent
      },
      {
        path: "my-profile",
        component: MyProfileComponent
      },
      {
        path: "category-map/:categoryID",
        component: CategoryMapComponent
      },
      {
        path: "add-image",
        component: AddImageComponent
      },
      {
        path: "setting",
        component: SettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
