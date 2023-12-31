import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote-menu',
  templateUrl: './vote-menu.component.html',
  styleUrls: ['./vote-menu.component.scss']
})
export class VoteMenuComponent {
  id: number | undefined;
  public roomData: any = {
    topic: {
      name: ""
    }
  };
  private sub: any;
  error: any = "";
  urlpath: any = "";

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
      },
      (error:HttpErrorResponse) => {
        this.error = error.headers.get("Message") +". Press this to go to the result page."
      }
    )
  }

  public loadRoom(){
    this.http.get<any>("/api/poll?roomCode="+ this.id).subscribe(res => {
      if (res) {
        this.roomData = res;
        this.urlpath = "/room/"+ this.id +"/result";
      } else {
        alert("Authentication failed.");
      }
    })
  }
}
