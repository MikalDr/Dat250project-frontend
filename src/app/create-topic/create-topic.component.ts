import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';

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

  startDate = new Date();
  endDate = new Date();

  topic = {
    name:"",
    voteOptions: []
  }
  poll = {

  }

  errorMessage: any = ""
  createdTopic = null

  constructor(
    private router: Router,
    private http: HttpClient,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    if(!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }
    // UTC +1 FIX TODO FIXIT
    let now = new Date();
    this.startDate.setHours(now.getHours() + 1);
    this.endDate.setHours(now.getHours() + 1);
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
      if (this.topic.name == "") {
        this.errorMessage = "Topic name can not be empty!"
      }
      else if (this.getVoteOptions().length < 2) {
        this.errorMessage = "You need a minimum of two voteoptions!"
      } else {
      let url = "/api/topic";
      this.http.post<any>(url, {
        name: this.topic.name,
        voteOptions: this.getVoteOptions(),

      }).subscribe(res => {
        if (res) {
          this.createdTopic = res.id;
          //this.router.navigate([""]);
          this.sendPoll()
        } else {
        }
      })
    }
  }
  public sendPoll() {
    let url = "/api/poll/"+this.createdTopic;
    this.http.post<any>(url, {
      "startDate": this.startDate.toISOString(),
      "endDate":  this.endDate.toISOString(),
      "private": this.isPrivate
    }).subscribe(res => {
      if (res) {
        this.clipboard.copy(res.roomCode);
        this.router.navigate(["/my-topics"]);
      } else {
      }
    })
  }
}
