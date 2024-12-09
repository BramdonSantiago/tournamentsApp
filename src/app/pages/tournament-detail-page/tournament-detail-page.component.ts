import { Component } from '@angular/core';
import { HeaderComponentComponent } from '../../components/header-component/header-component.component';
import { ActivatedRoute } from '@angular/router';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../models/tournament';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tournament-detail-page',
  imports: [HeaderComponentComponent, DatePipe],
  templateUrl: './tournament-detail-page.component.html',
  styleUrl: './tournament-detail-page.component.sass'
})
export class TournamentDetailPageComponent {
  // tournament!: Tournament;
  tournament: any;
  
  constructor(private tournamentsService: TournamentsService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.tournamentsService.getTournamentById(id).subscribe((data) => {
        this.tournament = data;
      });
    }
  }
}
