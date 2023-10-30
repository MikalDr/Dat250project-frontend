import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListComponent } from './list/list.component';
import { RequestInterceptor } from './request.interceptor';
import { HomeComponent } from './home/home.component';
import { VoteMenuComponent } from './vote-menu/vote-menu.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ProfileComponent } from './profile/profile.component';
import { VoteResultsComponent } from './vote-results/vote-results.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent,
    HomeComponent,
    VoteMenuComponent,
    CreatePollComponent,
    ProfileComponent,
    VoteResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
