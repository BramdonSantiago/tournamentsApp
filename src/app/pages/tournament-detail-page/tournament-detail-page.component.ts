import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../models/tournament';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-tournament-detail-page',
  imports: [DatePipe, CommonModule, RouterModule],
  templateUrl: './tournament-detail-page.component.html',
  styleUrl: './tournament-detail-page.component.sass'
})
export class TournamentDetailPageComponent {
  // tournament!: Tournament;
  tournament: any;

  modalShow: boolean = false;
  
  constructor(private tournamentsService: TournamentsService, private route: ActivatedRoute, private router: Router, private toastService: ToastService) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.tournamentsService.getTournamentById(id).subscribe((data) => {
        this.tournament = data;
      });
    }
  }

  showModal() {
    this.modalShow = !this.modalShow;
  }

  tournamentDelete(tournamentId: number) {
    this.tournamentsService.deleteTournament(tournamentId);
    setTimeout(() => {
      this.toastService.showToast('El torneo se ha eliminado correctamente');
      this.router.navigate(['/tournaments']);
    }, 1000);
  }
}
