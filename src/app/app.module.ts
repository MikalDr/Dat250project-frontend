import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from  '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestInterceptor } from './request.interceptor';
import { HomeComponent } from './home/home.component';
import { VoteMenuComponent } from './vote-menu/vote-menu.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ProfileComponent } from './profile/profile.component';
import { VoteResultsComponent } from './vote-results/vote-results.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { HeaderComponent } from './header/header.component';
import { HomeLoggedComponent } from './home-logged/home-logged.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ClipboardModule } from '@angular/cdk/clipboard';

import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MyVotesComponent } from './my-votes/my-votes.component';
import { MyTopicsComponent } from './my-topics/my-topics.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MyVotesComponent,
    HomeComponent,
    VoteMenuComponent,
    MyTopicsComponent,
    CreatePollComponent,
    ProfileComponent,
    VoteResultsComponent,
    HeaderComponent,
    HomeLoggedComponent,
    CreateTopicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatNativeDateModule,
    ClipboardModule,
    DatePipe
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule{

 }
