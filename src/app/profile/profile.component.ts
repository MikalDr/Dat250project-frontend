import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public userData: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if(!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }
    this.load_userprofile();
  }

  private load_userprofile(): void {
    this.http.get<any>("/api/user").subscribe(res => {
      if (res) {
        this.userData = res;
      } else {
        alert("Authentication failed.");
      }
    })
  }

  public to_my_topics() {
    this.router.navigate(["/my-topics"]);
  }

  public to_voted_polls() {
    this.router.navigate(["/my-votes"]);
  }

  public logout() {
    this.http.get<any>("/api/logout").subscribe(res => {
        sessionStorage.removeItem("token");
        sessionStorage.clear();
        this.router.navigate(["/"]);
    })
  }
}
