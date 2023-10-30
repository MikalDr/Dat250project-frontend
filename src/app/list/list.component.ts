import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  topics: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>("/api/topic?sessionId="+sessionStorage.getItem('token')).pipe().subscribe(res => {
      if (res) {
        this.topics = res
      }
      else {
        alert("Failed to query list")
      }
    })
  }

}
