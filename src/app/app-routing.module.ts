import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authenticationGuard } from './authentication.guard';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { VoteMenuComponent } from './vote-menu/vote-menu.component';
import { VoteResultsComponent } from './vote-results/vote-results.component';

const routes: Routes = [
  {path: "", canActivate:[authenticationGuard], children:[
    { path: "", component: HomeComponent},
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "my-topics", component: ListComponent},
    { path: "room/:id", component: VoteMenuComponent},
    { path: "room/:id/result", component: VoteResultsComponent},
    { path: "**", redirectTo: ""}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
