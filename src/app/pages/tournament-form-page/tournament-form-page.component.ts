import { Component } from '@angular/core';
import { HeaderComponentComponent } from '../../components/header-component/header-component.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, ValidationErrors, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { TournamentsService } from '../../services/tournaments.service';
import { Tournament } from '../../models/tournament';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { FlatpickrDirective } from 'angularx-flatpickr';

@Component({
  selector: 'app-tournament-form-page',
  imports: [HeaderComponentComponent, CommonModule, FormsModule, ReactiveFormsModule, FlatpickrDirective],
  templateUrl: './tournament-form-page.component.html',
  styleUrl: './tournament-form-page.component.sass'
})
export class TournamentFormPageComponent {
  localStorageForm: string = "localStorageForm";

  minDate: string = new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0];

  selectedDate: Date | null = null

  imageUrl: any;
  rules: string[] = [''];

  file: any;
  urlFile!: string;

  isUpdateMode: boolean = false;

  tournament!: any;

  idTournament!: number;

  rulesText: string = '';
  savedRules: string[] = [];

  showToast: boolean = false;
  messageToast: string = "";

  tournamentForm = new FormGroup({
    imgInput: new FormControl('', this.imageValidator.bind(this)),
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


  constructor(private cdr: ChangeDetectorRef, private tournamentsService: TournamentsService, private route: ActivatedRoute, private toastService: ToastService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.isUpdateMode = params.has('id');
      this.idTournament = Number(this.route.snapshot.paramMap.get('id'));
      if (this.idTournament) {
        this.removeDataLocalStorage();
        this.tournamentsService.getTournamentById(this.idTournament).subscribe((data) => {
          this.tournament = data;
        });
        console.log(this.tournament);
        this.imageUrl = this.tournament.image
        this.tournamentForm.patchValue({
          nameInput: this.tournament.name,
          locationInput: this.tournament.location,
          numberPlayersInput: this.tournament.numberPlayers,
          timeInput: this.tournament.time,
          rewardInput: this.tournament.reward,
          priceInput: this.tournament.price,
          modeInput: this.tournament.mode,
          dateInput: this.tournament.date,
          descriptionInput: this.tournament.description,
        });
      }
    });

    const savedDataLocalStorage = localStorage.getItem(this.localStorageForm);
    if (savedDataLocalStorage) {
      this.tournamentForm.patchValue(JSON.parse(savedDataLocalStorage));
    }
    this.tournamentForm.valueChanges.subscribe((formData) => {
      localStorage.setItem(this.localStorageForm, JSON.stringify(formData));
    });

  }
  

  imageValidator(control: AbstractControl): ValidationErrors | null {
    // console.log(this.imageUrl);
    if (!this.imageUrl && !control.value) {
      return { required: true };
    }
    return null;
  }


  removeDataLocalStorage() {
    localStorage.removeItem(this.localStorageForm);
  }

  


  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
    this.file = event.target.files[0];
  }

  addRule() {
    this.rules.push('');
    console.log(this.rules);
    this.cdr.detectChanges();
  }

  removeLastRule() {
    if (this.rules.length > 1) {
      this.rules.pop();
      this.cdr.detectChanges();
    }
  }

  onSubmit() {
    if (!this.tournamentForm.valid) {
      this.getInvalidControls();
    } else {
        const transformedFormValue: Tournament  = {
        id: this.idTournament,
        image: this.urlFile || '',
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

      if (this.isUpdateMode) {
        this.tournamentsService.updateTournament(transformedFormValue);
        setTimeout(() => {
          this.toastService.showToast('El torneo se ha actualizado correctamente');
          this.tournamentForm.reset();
          this.imageUrl = "";
        }, 1000);
      } else {
        this.tournamentsService.addTournament(transformedFormValue);
        setTimeout(() => {
          this.toastService.showToast('El torneo se ha creado correctamente');
          this.tournamentForm.reset();
          this.imageUrl = "";
        }, 1000);
      }
      
    }
  }

  getInvalidControls() {
    return Object.values(this.tournamentForm.controls).forEach(control => {
      control.markAllAsTouched();
    })
  }


  uploadImage() {
    if (!this.tournamentForm.valid) {
      this.getInvalidControls();
      return;
    }
  
    // console.log("Estoy aqui");
  
    // Determinar qué archivo usar
    const fileToUpload = this.file || this.imageUrl;
    
    if (!fileToUpload) {
      console.error('No hay archivo para subir');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('upload_preset', 'tournaments_preset');
  
    this.tournamentsService.uploadImage(formData).subscribe(
      (response: any) => {
        console.log('Imagen subida', response);
        this.urlFile = response.secure_url;
        this.onSubmit();
      },
      (error) => {
        console.error('Error al subir la imagen', error);
      }
    );
  }

  updateRules() {
    this.savedRules = this.rulesText.split('\n').filter(rule => rule.trim() !== '');
  }
  

}
