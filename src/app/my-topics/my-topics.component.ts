import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.scss']
})
export class MyTopicsComponent implements OnInit {
  topics: any[] = [];

  constructor(private http: HttpClient, private router: Router, private clipboard: Clipboard) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }
    this.http.get<any>("/api/topic").pipe().subscribe((res) => {
      if (res) {
        console.log(res)
        this.topics = res
      }
      else {
        alert("Failed to query list")
      }
    },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log("401 Unauthorized Error:", error);
          this.router.navigate(["/login"])
        } else {
          console.error("An error occurred:", error);
        }
      }
    )
  }

  getIotToken(pollId: number): void {
    this.http.post<any>("/api/iot/" + pollId, {}).subscribe(res => {
      if (res) {
        this.clipboard.copy(res.sessionId);
        console.log("Copied")
      } else {
        alert("Get IoT token failed.");
      }
    })
  }

  toPoll(roomCode: string): void {
    this.router.navigate([`/room/${roomCode}/result`]);
  }

  getDate(dateList: number[]): string {

    const [year = 2000, month = 1, day = 1, hour = 1, minute = 0] = dateList;
    const date = new Date(year, month - 1, day, hour + 1, minute);
    let str = date.toISOString().split("T")
    let dateString = str[0];
    let timeString = str[1].substring(0, 5);

    return dateString + " " + timeString;
  }
}
