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

  startDate = new Date(2023, 10, 13);
  endDate = new Date(2023, 10, 13);

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
      "startDate": this.startDate.toISOString(),
      "endDate":  this.endDate.toISOString(),
      "private": this.isPrivate
    }).subscribe(res => {
      if (res) {
        this.router.navigate(["/my-topics"]);
      } else {
      }
    })
  }
}
