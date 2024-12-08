import { Component } from '@angular/core';
import { HeaderComponentComponent } from '../../components/header-component/header-component.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../models/tournament';

@Component({
  selector: 'app-tournament-form-page',
  imports: [HeaderComponentComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tournament-form-page.component.html',
  styleUrl: './tournament-form-page.component.sass'
})
export class TournamentFormPageComponent {
  imageUrl: string | ArrayBuffer | null = null;
  rules: string[] = [''];

  tournamentForm = new FormGroup({
    imgInput: new FormControl('', [Validators.required]),
    nameInput: new FormControl('', [Validators.required, Validators.minLength(10)]),
    locationInput: new FormControl('', Validators.required),
    numberPlayersInput: new FormControl('', Validators.required),
    timeInput: new FormControl('', Validators.required),
    rewardInput: new FormControl('', [Validators.required, Validators.minLength(40)]),
    priceInput: new FormControl('', Validators.required),
    modeInput: new FormControl('', Validators.required),
    dateInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl('', [Validators.required, Validators.minLength(400)]),
  });


  constructor(private cdr: ChangeDetectorRef, private tournamentsService: TournamentsService) {}


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result; // Asigna la URL de la imagen a la variable
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  addRule() {
    this.rules.push(''); // Agrega un nuevo input
    this.cdr.detectChanges(); // Fuerza la actualización de la vista
  }

  removeLastRule() {
    if (this.rules.length > 1) {
      this.rules.pop(); // Elimina el último input
      this.cdr.detectChanges(); // Fuerza la actualización de la vista
    }
  }

  onSubmit() {
    if (!this.tournamentForm.valid) {
      this.getInvalidControls();
    } else {
      const transformedFormValue: Tournament  = {
        id: 0,
        image: this.tournamentForm.value.imgInput || '',
        name: this.tournamentForm.value.nameInput || '',
        location: this.tournamentForm.value.locationInput || '',
        numberPlayers: this.tournamentForm.value.numberPlayersInput || '',
        time: this.tournamentForm.value.timeInput || '',
        reward: this.tournamentForm.value.rewardInput || '',
        price: this.tournamentForm.value.priceInput || '',
        mode: this.tournamentForm.value.modeInput || '',
        date: this.tournamentForm.value.dateInput || '',
        description: this.tournamentForm.value.descriptionInput || '',
      };
      
      this.tournamentsService.addTournament(transformedFormValue);
      setTimeout(() => {
        this.tournamentForm.reset();
      }, 1000);
    }
  }

  getInvalidControls() {
    return Object.values(this.tournamentForm.controls).forEach(control => {
      control.markAllAsTouched();
    })
  }

}
