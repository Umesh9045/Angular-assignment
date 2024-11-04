import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // Assuming appConfig is an object for your application config
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), ...appConfig.providers]
})
  .catch((err) => console.error(err));
