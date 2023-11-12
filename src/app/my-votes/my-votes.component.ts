import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Vote {
  id: number;
  poll: number | any;
  voteOption: {
    id: number;
    label: string;
  };
  voter: number;
}

@Component({
  selector: 'app-my-votes',
  templateUrl: './my-votes.component.html',
  styleUrls: ['./my-votes.component.scss']
})
export class MyVotesComponent {
  votes: Vote[] = [];
  selectedOption: any = {
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem("token")) {
      this.router.navigate(["/login"]);
    }

    this.http.get<Vote[]>("/api/my-votes").pipe().subscribe(res => {
      if (res) {
        console.log(res)
        this.votes = res

        res.forEach(vote => {
            this.http.get<any>("/api/poll/" + vote.poll).subscribe(res => {
              if (res) {
                vote.poll = res;
              } else {
                alert("Get poll failed.");
              }
            })
        });
      }
      else {
        alert("Failed to query list")
      }
    })
  }

  onOptionSelected(voteId : number) {
    this.http.put<Vote>("/api/vote/" + voteId, this.selectedOption).subscribe(res => {
      if (res) {
        this.votes = this.votes.map(vote => {
          if (vote.id === voteId){
            vote.voteOption = res.voteOption;
            return vote;
          }
          return vote;
        });
        //this.ngOnInit()
      } else {
        alert("Voteoption change failed.");
      }
    })
  }
}
