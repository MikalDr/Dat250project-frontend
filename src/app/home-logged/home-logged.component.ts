import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-logged',
  templateUrl: './home-logged.component.html',
  styleUrls: ['./home-logged.component.scss']
})
export class HomeLoggedComponent {
  public roomCode: any;
  public roomData: any;

    constructor(
      private router: Router,
      private http: HttpClient
    ) {}


  ngOnInit(): void {
    if(!sessionStorage.getItem("token")) {
        this.router.navigate([""]);
    }
  }


    public connectToRoom(){
      this.router.navigate(["/room/"+this.roomCode]);
      this.http.get<any>("/api/poll?roomCode="+ this.roomCode).subscribe(res => {
        if (res) {
          this.roomData = res;
        } else {
          alert("Authentication failed.");
        }
      })
    }

    public goToProfile(){
      if(!sessionStorage.getItem("token")) {
          this.router.navigate(["/login"]);
      }
      else {
        this.router.navigate(["/profile"]);
      }
    }

    public goToCreateTopic() {
      if(!sessionStorage.getItem("token")) {
        this.router.navigate(["/login"]);
    }
    else {
      this.router.navigate(["/create-topic"]);
    }
    }
  }
