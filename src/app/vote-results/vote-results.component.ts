import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vote-results',
  templateUrl: './vote-results.component.html',
  styleUrls: ['./vote-results.component.scss']
})
export class VoteResultsComponent {
  id: number | undefined;
  public topic: any;
  public voteData: any;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params["id"];
      this.loadVotes();
      this.loadRoom();
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public loadRoom(){
    this.http.get<any>("/api/poll?roomCode="+ this.id).subscribe(res => {
      if (res) {
        this.topic = res.topic.name;
      } else {
        alert("Authentication failed.");
      }
    })
  }

  public loadVotes() {
    this.http.get<any>("/api/votes?roomCode="+ this.id).subscribe(res => {
      if (res) {
        this.voteData = res;
      } else {
        alert("Authentication failed.");
      }
    })
  }

  roundDownPercentage(voteCount: number, totalVotes: number): number {
    return Math.floor((voteCount / totalVotes) * 100);
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
