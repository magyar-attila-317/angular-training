import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'WS08-Angular-Pipes';
  currentDate: Date = new Date();

}
