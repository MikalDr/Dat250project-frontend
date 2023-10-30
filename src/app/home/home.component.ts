import { HttpClient } from '@angular/common/http';
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

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

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
}
