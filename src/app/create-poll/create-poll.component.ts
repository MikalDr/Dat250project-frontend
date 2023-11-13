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
  selectedTopic: any;
  isPrivate: boolean = false;
  confusedMessage: string = "";

  startDate = new Date();
  endDate = new Date();

  constructor(private http: HttpClient, private router: Router,) {
  }

  ngOnInit(): void {
    if (!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }

    // UTC +1 FIX TODO FIXIT
    let now = new Date();
    this.startDate.setHours(now.getHours() + 1);
    this.endDate.setHours(now.getHours() + 1);

    this.getTopics();
  }

  getTopics() {
    this.http.get<any>("/api/topic").pipe().subscribe((res) => {
      if (res) {
        this.topics = res
        if (this.topics.length === 0){
          this.confusedMessage = "You have no created Topics!";
          this.selectedTopic = null;
        }
        else{
          this.selectedTopic = this.topics[0];
        }
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
    let url = "/api/poll/" + this.selectedTopic.id;
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
