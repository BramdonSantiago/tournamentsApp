import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CloudinaryModule } from '@cloudinary/ng';
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { HeaderComponentComponent } from './components/header-component/header-component.component';
import { ToastComponentComponent } from './components/toast-component/toast-component.component';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CloudinaryModule, HeaderComponentComponent, ToastComponentComponent, FooterComponentComponent],
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
