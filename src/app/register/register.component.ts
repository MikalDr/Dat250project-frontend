import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  model: any = {
  };
  sessionId: any = {};


  constructor(
      private router: Router,
      private http: HttpClient
  ) {}

  ngOnInit(): void {
  }

  public register(){
    let url = "/api/register";
    this.http.post<any>(url, {
      username: this.model.username,
      email: this.model.email,
      password: this.model.password
    }).subscribe(res => {
      if (res) {
        this.sessionId = res.sessionId;

        sessionStorage.setItem(
          "token", this.sessionId
        );
        this.router.navigate([""]);
      } else {
        alert("Authentication failed.");
      }
    })
  }
}
