import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    model: any = {
    };
    sessionId: any = {};

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
    }

    public login(){
      let url = "/api/login";
      this.http.post<any>(url, {
        username: this.model.username,
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
