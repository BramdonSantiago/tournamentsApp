import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.component.html',
  styleUrl: './toast-component.component.sass'
})
export class ToastComponentComponent {
  @Input() showToast: boolean = false;
  @Input() message: string = '';
}
