import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

public roomCode: any;
public roomData: any;
public errorMessage: any;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if(sessionStorage.getItem("token")) {
        this.router.navigate(["/home"]);
    }
  }

  public connectToRoom(){
    this.http.get<any>("/api/poll?roomCode="+ this.roomCode).subscribe(res => {
      if (res) {
        this.roomData = res;
        this.router.navigate(["/room/"+this.roomCode]);
      } else {
        alert("Authentication failed.");
      }
    },
    (error:HttpErrorResponse) => {
      this.errorMessage = error.headers.get("Message")
    }
    )
  }
}
