
import { forwardRef, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptorService } from './error-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-full-width',
      preventDuplicates: true,
      easeTime: 400,
      closeButton: true
    }),
    
  ],


  providers:
    [AuthGuard,
      [forwardRef(() => DataService)],
      Location, 
      { provide: LocationStrategy, useClass: PathLocationStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
      ChatService
    ],

  bootstrap: [AppComponent]
})
export class AppModule { }

@Injectable()
export class DataService {
}

