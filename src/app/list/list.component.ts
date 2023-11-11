import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  topics: any[] = [];

  constructor(private http: HttpClient, private router: Router, private clipboard: Clipboard) {}

  ngOnInit(): void {
    if(!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }

    this.http.get<any>("/api/topic").pipe().subscribe(res => {
      if (res) {
        console.log(res)
        this.topics = res
      }
      else {
        alert("Failed to query list")
      }
    })
  }

  getIotToken(pollId : number) : void {
    this.http.post<any>("/api/iot/"+pollId, {}).subscribe(res => {
      if (res) {
        this.clipboard.copy(res.sessionId);
        console.log("Copied")
      } else {
        alert("Get IoT token failed.");
      }
    })
  }
}
