import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './authentication.guard';
import { MyTopicsComponent } from './my-topics/my-topics.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { VoteMenuComponent } from './vote-menu/vote-menu.component';
import { VoteResultsComponent } from './vote-results/vote-results.component';
import { HomeLoggedComponent } from './home-logged/home-logged.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { MyVotesComponent } from './my-votes/my-votes.component';

const routes: Routes = [
  {path: "", canActivate:[authenticationGuard], children:[
    { path: "", component: HomeComponent},
    { path: "home", component: HomeLoggedComponent},
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "my-topics", component: MyTopicsComponent},
    { path: "my-votes", component: MyVotesComponent},
    { path: "room/:id", component: VoteMenuComponent},
    { path: "profile", component: ProfileComponent},
    { path: "create-topic", component: CreateTopicComponent},
    { path: "room/:id/result", component: VoteResultsComponent},
    { path: "**", redirectTo: ""}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
