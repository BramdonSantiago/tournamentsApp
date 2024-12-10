import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _message = new BehaviorSubject<string>('');
  private _isVisible = new BehaviorSubject<boolean>(false);

  message$ = this._message.asObservable();
  isVisible$ = this._isVisible.asObservable();
  constructor() { }

  showToast(message: string, duration: number = 6000) {
    this._message.next(message);
    this._isVisible.next(true);

    setTimeout(() => {
      this._isVisible.next(false);
    }, duration);
  }
}
