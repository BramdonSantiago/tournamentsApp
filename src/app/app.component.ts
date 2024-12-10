import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/ng';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { ToastComponentComponent } from './components/toast-component/toast-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CloudinaryModule, ToastComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'tournamentsApp';
  img!: CloudinaryImage;

  ngOnInit() {
    const cld = new Cloudinary({
      cloud: {
        cloudName: 'demo'
      }
    });
  }
}
