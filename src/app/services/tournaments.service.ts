import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../models/tournament';

// export interface Tournament {
//   id: number;
//   name: string;
//   date: string;
//   image: string;
// }

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  // private tournaments: Tournament[] = [];
  private tournaments: Tournament[] = [];
  // private tournamentsSubject = new BehaviorSubject<Tournament[]>(this.tournaments);
  private tournamentsSubject = new BehaviorSubject<Tournament[]>(this.tournaments);

  tournaments$ = this.tournamentsSubject.asObservable();

  constructor() { 
    this.loadFromStorage();
  }

  addTournament(tournament: Tournament): void {
    // const newId = this.generateId();
    console.log("Tengo el valor en el service", tournament);
    this.tournaments.push({ ...tournament, id: this.generateId() });
    this.saveToLocalStorage();
    this.tournamentsSubject.next(this.tournaments);
  }

  private generateId(): number {
    return this.tournaments.length > 0
      ? Math.max(...this.tournaments.map(t => t.id)) + 1
      : 1;
  }

  saveToLocalStorage(): void {
    localStorage.setItem('tournaments', JSON.stringify(this.tournaments));
  }

  getTournaments(): Observable<any[]> {
    return this.tournaments$;
  }

  loadFromStorage(): void {
    const storedTournaments = localStorage.getItem('tournaments');
    this.tournaments = storedTournaments ? JSON.parse(storedTournaments) : [];
    this.tournamentsSubject.next(this.tournaments);
  }

  getTournamentById(id: number): Observable<Tournament | undefined> {
    const tournament = this.tournaments.find(t => t.id === id);
    return new BehaviorSubject<Tournament | undefined>(tournament);
  }
}
