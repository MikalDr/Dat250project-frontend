import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss'],
})
export class CreateTopicComponent {
  isPrivate: boolean = false;
  counter = 2;
  public voteOptions: any = {"1":"Yes", "2":"No"};
  public voteOptionKeys: Set<any> = new Set(["1", "2"]);

  minDate = new Date(2000, 1, 1);
  maxDate = new Date(3000, 1, 1);

  startDate = new Date(2001, 10, 5);
  endDate = new Date(2030, 10, 5);

  topic = {
    name:"",
    voteOptions: []
  }
  poll = {

  }

  createdTopic = null

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    if(!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }
  }

  public deleteOption(option: any) {
    delete this.voteOptions[option];
    this.voteOptionKeys.delete(option);
    console.log(this.voteOptions)
  }

  public addOption() {
    this.counter += 1;
    this.voteOptions[this.counter.toString()]= "";
    this.voteOptionKeys.add(this.counter.toString());
    console.log(this.voteOptions)
  }

  public getVoteOptions() {
    const list = []
    for (const [key, value] of Object.entries(this.voteOptions)){
      list.push({label: value});
    }
    console.log(list)
    return list
  }

  public sendTopic() {
      let url = "/api/topic";
      this.http.post<any>(url, {
        name: this.topic.name,
        voteOptions: this.getVoteOptions(),

      }).subscribe(res => {
        if (res) {
          this.createdTopic = res.id;
          this.router.navigate([""]);
          this.sendPoll()
        } else {
        }
      })
  }
  public sendPoll() {
    let url = "/api/poll/"+this.createdTopic;
    this.http.post<any>(url, {
      "startDate":"2020-01-12T12:00:00",
      "endDate":  "2023-12-24T12:00:00",
      "isPrivate": true
    }).subscribe(res => {
      if (res) {
        this.router.navigate([""]);
      } else {
      }
    })
  }
}
