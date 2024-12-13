import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TournamentFormPageComponent } from './tournament-form-page.component';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { TournamentsService } from '../../services/tournaments.service'

describe('TournamentFormPageComponent', () => {
    let component: TournamentFormPageComponent;
    let fixture: ComponentFixture<TournamentFormPageComponent>;
    let mockActivatedRoute: any;

    beforeEach(async () => {
        mockActivatedRoute = {
            paramMap: of(new Map([['id', '1']])),
            snapshot: {
                paramMap: new Map([['id', '1']]),
            },
        };

        await TestBed.configureTestingModule({
            imports: [TournamentFormPageComponent],
            providers: [{ provide: TournamentsService }, provideHttpClient(), provideFlatpickrDefaults(), provideHttpClientTesting(), { provide: ActivatedRoute, useValue: mockActivatedRoute }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TournamentFormPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    //ESTA PRUEBA UNITARIA ME EVALUA QUE EL NOMBRE DEL TORNEO SEA REQUERIDO   
    it('should mark nameInput as invalid when empty', () => {
        const nameInput = component.tournamentForm.get('nameInput');
        nameInput?.setValue('');
        expect(nameInput?.valid).toBeFalse();
        expect(nameInput?.hasError('required')).toBeTrue();
    });

    //ESTA PRUEBA UNITARIA PONE A PRUEBA UN NOMBRE QUE SERÍA CORTO PARA EL TORNEO
    //TRATANDOSE DE UNA LONGITUD MINIMA DE 10 CARACTERES  
    it('should mark nameInput as invalid when length is less than 10 characters', () => {
        const nameInput = component.tournamentForm.get('nameInput');
        nameInput?.setValue('Torneo');
        expect(nameInput?.valid).toBeFalse();
        expect(nameInput?.hasError('minlength')).toBeTrue();
    });

    //ESTA PRUEBA UNITARIA PONE A PRUEBA UN NOMBRE QUE SERÍA VALIDO PARA EL TORNEO
    //TRATANDOSE DE UNA LONGITUD MINIMA DE 10 CARACTERES  
    it('should mark nameInput as valid when length is 10 or more characters', () => {
        const nameInput = component.tournamentForm.get('nameInput');
        nameInput?.setValue('Torneo largo'); // Valor con más de 10 caracteres
        expect(nameInput?.valid).toBeTrue(); // El campo debe ser válido
    });

    //ESTA PRUEBA UNITARIA EVALUA QUE SOLO SE PERMITA EL INGRESO DE CARACTERES NÚMERICOS
    it('should mark numberPlayersInput as invalid when non-numeric value is entered', () => {
        const numberPlayersInput = component.tournamentForm.get('numberPlayersInput');
        numberPlayersInput?.setValue('abc');
        expect(numberPlayersInput?.valid).toBeFalse();
        expect(numberPlayersInput?.hasError('pattern')).toBeTrue();
    });

      //ESTA PRUEBA UNITARIA INDICA QUE SE EXCEDE DE LA LONGITUD NÚMERICA ESTABLECIDA
    //A 3 DIGITOS
    it('should mark numberPlayersInput as invalid when value exceeds max length', () => {
        const numberPlayersInput = component.tournamentForm.get('numberPlayersInput');
        numberPlayersInput?.setValue('1234');
        expect(numberPlayersInput?.valid).toBeFalse();
        expect(numberPlayersInput?.hasError('maxlength')).toBeTrue();
    });

    //ESTA PRUEBA UNITARÍA MUESTRA UN CORRECTO USO MÁXIMO DEL INPUT
    // PARA NÚMMERO DE JUGADORES (3 DIGITOS MAX)
    it('should mark numberPlayersInput as valid when a valid value is entered', () => {
        const numberPlayersInput = component.tournamentForm.get('numberPlayersInput');
        numberPlayersInput?.setValue('123');
        expect(numberPlayersInput?.valid).toBeTrue();
    });

     //PRUEBA UNITARIA EVALUANDO LO QUE SERIA ESCRIBIR UN PREMIO CORTO
    it('should mark rewardInput as invalid when value is less than 40 characters', () => {
        const rewardInput = component.tournamentForm.get('rewardInput');
        rewardInput?.setValue('Premio corto');
        expect(rewardInput?.valid).toBeFalse();
        expect(rewardInput?.hasError('minlength')).toBeTrue();
    });

     //PRUEBA UNITARIA QUE CUMPLE CON EL CORRECTO USO DE INPUT PREMIO
    it('should mark rewardInput as valid when value is 40 or more characters', () => {
        const rewardInput = component.tournamentForm.get('rewardInput');
        rewardInput?.setValue('Premio largo que cumple con la longitud mínima de 40 caracteres');
        expect(rewardInput?.valid).toBeTrue();
    });

     //PRUEBA UNITARIA PARA EVALUAR UANA DESCRIPCIÓN CORTA INAVALIDA PARA EL TORNEO
    //  SE BUSCA QUE AL MENOS LA DESCIPCIÓN DEL TORNEO SEA DE 400 CARACTERES
    it('should mark descriptionInput as invalid when value is less than 400 characters', () => {
        const descriptionInput = component.tournamentForm.get('descriptionInput');
        descriptionInput?.setValue('Descripción corta');
        expect(descriptionInput?.valid).toBeFalse();
        expect(descriptionInput?.hasError('minlength')).toBeTrue();
    });

     //PRUEBA UNITARIA CON UNA DESCRIPCIÓN PARA EL TORNEO VALIDA Y CORRRECTA
    //  CONSIGUIENDO 400 CARACTERES
    it('should mark descriptionInput as valid when value is 400 or more characters', () => {
        const descriptionInput = component.tournamentForm.get('descriptionInput');
        const longDescription = 'A'.repeat(400);
        descriptionInput?.setValue(longDescription);
        expect(descriptionInput?.valid).toBeTrue();
    });
});
