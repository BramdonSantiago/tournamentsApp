import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-singular-tournament-component',
  imports: [RouterModule, DatePipe],
  templateUrl: './singular-tournament-component.component.html',
  styleUrl: './singular-tournament-component.component.sass'
})
export class SingularTournamentComponentComponent {
  @Input() tournament: any;
}
