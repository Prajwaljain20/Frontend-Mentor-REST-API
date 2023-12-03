import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private dataService: DataService) { }

  nightMode: string = '';

  ngOnInit(): void {
    this.dataService.nightMode.subscribe(res => this.nightMode = res);
  }
  switchMode() {
    this.dataService.toogleTheme();
  }
}
