import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-menu',
  templateUrl: './vote-menu.component.html',
  styleUrls: ['./vote-menu.component.scss']
})
export class VoteMenuComponent {
  id: number | undefined;
  public roomData: any;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe( params => {
      this.id = +params["id"];
      this.loadRoom();
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public vote(pollId: any, voteOptionId: any) {
    this.http.post<any>("/api/vote", {
      "poll": {"id":pollId} ,
      "voteOption":{"id": voteOptionId}
      }
      ).subscribe(
      res => {
        if (res) {
          //route to the result page of the poll
          this.router.navigate(["/room/"+this.id+"/result"]);
        }
      }
    )
  }

  public loadRoom(){
    this.http.get<any>("/api/poll?roomCode="+ this.id).subscribe(res => {
      if (res) {
        this.roomData = res;
      } else {
        alert("Authentication failed.");
      }
    })
  }
}
