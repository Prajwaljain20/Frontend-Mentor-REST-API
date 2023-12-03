import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { tap } from 'rxjs';
import { ICard, ISearch } from '../models/card-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('select') select!: ElementRef;
  @ViewChild('search') search!: ElementRef;
  cardObj: ICard[] = [];
  sortedData: ICard[] = [];
  filteredData: ICard[] = [];
  filters : string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  current: string = localStorage.getItem('current')  || '1';
  pages: number = 0;
  searchList: ISearch[] = [];
  loading = true;
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getData().pipe(tap(res=>{
      this.cardObj = res;
      this.loading = false;
    })).subscribe(() => {
      this.pages = Math.ceil(this.cardObj.length / 20);
      this.sortedData = this.cardObj;
      this.formatPages();
    });
  }

  sortData(): void {
    const region = this.select.nativeElement.value;
    this.current = '1';
    if (region !== '') {
      this.sortedData = this.cardObj.filter(card => card.region === region)
    } else {
      this.sortedData = this.cardObj;
    }
    this.pages = Math.ceil(this.sortedData.length / 20);
    this.formatPages();
  }

  goToCard(card: ICard): void {
    this.router.navigate(['card', card.cca3])
  }

  changePage(action: string): void {
    if (action === 'previous') {
      this.current = (parseInt(this.current) - 1).toString();
    } else {
      this.current = (parseInt(this.current) + 1).toString();
    }
    localStorage.setItem('current', this.current);
    this.formatPages();
  }

  formatPages(): void {
    this.filteredData = this.sortedData.slice((parseInt(this.current) - 1) * 20, parseInt(this.current) * 20);
  }

  onSearchInput(): void {
    const searchKeyword = this.search.nativeElement.value;
    if (searchKeyword.length > 0) {
      this.searchList = this.cardObj.filter(card => {
        return (
          (card.name.common)?.toLowerCase().includes(searchKeyword) ||
          (card.capital[0])?.toLowerCase().includes(searchKeyword) ||
          (card.region)?.toLowerCase().includes(searchKeyword)
        );
      }).map(card => ({name: card.name, cca3: card.cca3}));
    } else {
      this.searchList = [];
    }
  }
}
