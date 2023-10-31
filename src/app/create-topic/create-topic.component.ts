import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.scss'],
})
export class CreateTopicComponent {
  isPrivate: boolean = false;
  counter = 3;
  public voteOptions: any = {"1":"Yes", "2":"No"};
  public voteOptionKeys: Set<any> = new Set(["1", "2"]);

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public deleteOption(option: any) {
    delete this.voteOptions[option];
    this.voteOptionKeys.delete(option);
    this.counter -= 1;
  }

  public addOption() {
    this.counter += 1;
    this.voteOptions[this.counter.toString()]= "";
    this.voteOptionKeys.add(this.counter.toString());
  }

  public sendTopic() {
      let url = "/api/topic";
      this.http.post<any>(url, {

      }).subscribe(res => {
        if (res) {

          this.router.navigate([""]);
          alert("Topic Created");
        } else {
          alert("Authentication failed.");
        }
      })
  }

}
