import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './header-component.component.html',
  styleUrl: './header-component.component.sass'
})
export class HeaderComponentComponent {
  isDisabledStats = true;
  isDisabledOrganizers = true;

}
