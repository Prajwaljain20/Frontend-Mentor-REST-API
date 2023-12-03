import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rest-countries-api-with-color-theme-switcher-master';
  constructor(public dataService: DataService) {
    console.log('🙏Thanks for Using🙏\nCoded By: Prajwal Jain');
    this.dataService.nightMode$.subscribe(res => document.documentElement.setAttribute('data-theme', res));
  }
}
