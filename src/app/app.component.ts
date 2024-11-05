import { Component } from '@angular/core';
import { NavComponent } from './module/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-assignment';
  showFiller = false;
}

