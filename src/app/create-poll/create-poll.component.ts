import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent {
  topics: any[] = [];
  selectedTopic: any = {};
  isPrivate: boolean = false;

  constructor(private http: HttpClient, private router: Router,) {
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }
    this.getTopics();
  }

  getTopics() {
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

  createPoll() {
    console.log(this.selectedTopic);
    let url = "/api/poll/" + this.selectedTopic;
    this.http.post<any>(url, {
      "startDate": "2020-01-12T12:00:00",
      "endDate": "2023-12-24T12:00:00",
      "private": this.isPrivate
    }).subscribe(res => {
      if (res) {
        this.router.navigate(["/my-topics"]);
      } else {
      }
    })
  }
}
