import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDetailsCard } from '../models/details-card-interface';
import { IBorder } from '../models/border-interface';
import { ICard } from '../models/card-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nightMode: BehaviorSubject<string> = new BehaviorSubject<string>('light-mode');
  nightMode$ = this.nightMode.asObservable();
  url: string = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {
    this.nightMode.next(localStorage.getItem('theme') || 'light-mode');
  }

  toogleTheme() {
    const currentTheme = this.nightMode.value === 'light-mode' ? 'dark-mode' : 'light-mode';
    this.nightMode.next(currentTheme);
    localStorage.setItem('theme', currentTheme);
  }

  getData() {
    return this.http.get(`${this.url}all?fields=name,capital,population,region,flags,cca3`) as Observable<ICard[]>;
  }

  getDataByCode(code: string) {
    return this.http.get(`${this.url}alpha?codes=${code}&fields=name,capital,currencies,languages,population,region,subregion,tld,flags,borders,altSpellings`) as Observable<IDetailsCard[]>;
  }

  getBorderByCode(code: string) {
    return this.http.get(`${this.url}alpha?codes=${code}&fields=name,cca3`) as Observable<IBorder[]>;
  }
}
