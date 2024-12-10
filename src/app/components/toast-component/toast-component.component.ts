import { Component, Input } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-component',
  imports: [],
  templateUrl: './toast-component.component.html',
  styleUrl: './toast-component.component.sass'
})
export class ToastComponentComponent {
  message: string = '';
  showToast: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.message$.subscribe((msg) => (this.message = msg));
    this.toastService.isVisible$.subscribe((visible) => (this.showToast = visible));
  }
}
