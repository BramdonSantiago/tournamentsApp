import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../models/tournament';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  private tournaments: Tournament[] = [];
  private tournamentsSubject = new BehaviorSubject<Tournament[]>(this.tournaments);

  tournaments$ = this.tournamentsSubject.asObservable();

  constructor(private http: HttpClient) { 
    this.loadFromStorage();
  }

  addTournament(tournament: Tournament): void {
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

  updateTournament(updatedTournament: Tournament): void {
    this.tournaments = this.tournaments.map(t =>
      t.id === updatedTournament.id ? updatedTournament : t
    );
    this.saveToLocalStorage();
    this.tournamentsSubject.next(this.tournaments);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post(`https://api.cloudinary.com/v1_1/dobbxfe78/image/upload`, formData);
  }
}
