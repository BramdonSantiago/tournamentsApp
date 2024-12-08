import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponentComponent } from '../../components/header-component/header-component.component';
import { SingularTournamentComponentComponent } from '../../components/singular-tournament-component/singular-tournament-component.component';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../models/tournament';

@Component({
  selector: 'app-tournaments-page',
  standalone: true,
  imports: [CommonModule, HeaderComponentComponent, SingularTournamentComponentComponent],
  templateUrl: './tournaments-page.component.html',
  styleUrl: './tournaments-page.component.sass'
})
export class TournamentsPageComponent {
  // tournaments2: any[] = [
  //   { id: 1, name: 'Battle Royale Championship', date: '18/02/2025', location: 'CDMX', price: '$1,000 USD', image: 'assets/images/tournament-1.jpg', type: 'Presencial' },
  //   { id: 2, name: 'League of Legends: Summer Showdown', date: '20/03/2025', location: 'Guadalajara', price: '$2,000 USD', image: 'assets/images/tournament-2.jpg', type: 'En línea' },
  //   { id: 3, name: 'Dota 2: International Tournament', date: '10/04/2025', location: 'Monterrey', price: '$3,000 USD', image: 'assets/images/tournament-3.jpg', type: 'Presencial' },
  //   { id: 4, name: 'Fortnite: Victory Royale Series', date: '15/06/2025', location: 'Cancún', price: '$1,500 USD', image: 'assets/images/tournament-4.jpg', type: 'En línea' },
  //   { id: 5, name: 'FIFA 2025 World Cup', date: '25/07/2025', location: 'Puebla', price: '$2,500 USD', image: 'assets/images/tournament-5.jpg', type: 'Presencial' },
  //   { id: 6, name: 'Overwatch: Heroes of the Storm', date: '05/09/2025', location: 'Tijuana', price: '$2,000 USD', image: 'assets/images/tournament-6.jpg', type: 'En línea' },
  //   { id: 7, name: 'Counter-Strike: Global Offensive Masters', date: '10/10/2025', location: 'Chihuahua', price: '$5,000 USD', image: 'assets/images/tournament-7.jpg', type: 'Presencial' },
  //   { id: 8, name: 'Valorant: The Final Duel', date: '20/11/2025', location: 'Aguascalientes', price: '$1,200 USD', image: 'assets/images/tournament-8.jpg', type: 'En línea' },
  //   { id: 9, name: 'Rocket League: Championship Series', date: '12/12/2025', location: 'CDMX', price: '$1,800 USD', image: 'assets/images/tournament-9.jpg', type: 'Presencial' },
  //   { id: 10, name: 'Street Fighter V: Global Tournament', date: '10/01/2026', location: 'Guadalajara', price: '$3,000 USD', image: 'assets/images/tournament-10.jpg', type: 'En línea' },
  //   // { id: 11, name: 'PUBG: World Championship', date: '22/02/2026', location: 'Monterrey', price: '$1,700 USD', image: 'assets/images/tournament-11.jpg', type: 'Presencial' },
  //   // { id: 12, name: 'Minecraft: Build & Battle', date: '25/03/2026', location: 'Mérida', price: '$4,000 USD', image: 'assets/images/tournament-12.jpg', type: 'En línea' },
  //   // { id: 13, name: 'Apex Legends: Global Clash', date: '15/04/2026', location: 'Puebla', price: '$2,200 USD', image: 'assets/images/tournament-13.jpg', type: 'Presencial' },
  //   // { id: 14, name: 'Call of Duty: Battle for Supremacy', date: '17/05/2026', location: 'Querétaro', price: '$3,500 USD', image: 'assets/images/tournament-14.jpg', type: 'En línea' },
  //   // { id: 15, name: 'Tekken 7: World Fight', date: '10/06/2026', location: 'Ciudad Juárez', price: '$2,000 USD', image: 'assets/images/tournament-15.jpg', type: 'Presencial' },
  //   // { id: 16, name: 'Super Smash Bros Ultimate: Championship', date: '01/07/2026', location: 'Monterrey', price: '$2,800 USD', image: 'assets/images/tournament-16.jpg', type: 'En línea' },
  //   // { id: 17, name: 'Hearthstone: Legends of Azeroth', date: '12/08/2026', location: 'Tijuana', price: '$2,500 USD', image: 'assets/images/tournament-17.jpg', type: 'Presencial' },
  //   // { id: 18, name: 'Battlegrounds Mobile: Global Showdown', date: '10/09/2026', location: 'Chihuahua', price: '$6,000 USD', image: 'assets/images/tournament-18.jpg', type: 'En línea' },
  //   // { id: 19, name: 'Hollow Knight: Dream World', date: '25/10/2026', location: 'Aguascalientes', price: '$1,500 USD', image: 'assets/images/tournament-19.jpg', type: 'Presencial' },
  //   // { id: 20, name: 'StarCraft II: Battle of the Stars', date: '15/12/2026', location: 'CDMX', price: '$2,000 USD', image: 'assets/images/tournament-20.jpg', type: 'En línea' },
  // ];
  tournaments: Tournament[] = [];

  constructor(private tournamentsService: TournamentsService) {}

  ngOnInit(): void {
    this.tournamentsService.getTournaments().subscribe(data => {
      this.tournaments = data;
    });
  }

}
