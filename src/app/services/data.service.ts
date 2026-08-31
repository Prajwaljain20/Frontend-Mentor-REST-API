import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IDetailResponse, IDetailsCard } from '../models/details-card-interface';
import { IBorder, IBorderResponse } from '../models/border-interface';
import { ICard, ICardResponse } from '../models/card-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  nightMode: BehaviorSubject<string> = new BehaviorSubject<string>('light-mode');
  nightMode$ = this.nightMode.asObservable();
  url: string = 'https://api.restcountries.com/countries/v5';

  constructor(private http: HttpClient) {
    this.nightMode.next(localStorage.getItem('theme') || 'light-mode');
  }

  toogleTheme() {
    const currentTheme = this.nightMode.value === 'light-mode' ? 'dark-mode' : 'light-mode';
    this.nightMode.next(currentTheme);
    localStorage.setItem('theme', currentTheme);
  }

  getData() {
    return this.http.get<ICardResponse>(`${this.url}?response_fields=codes.ccn3,names.common,population,region,capitals.name,flag.url_svg,flag.url_png,flag.description&limit=100`).pipe(map(res => res.data.objects)) as Observable<ICard[]>;
  }

  getDataByCode(code: string) {
    return this.http.get<IDetailResponse>(`${this.url}/codes.ccn3/${code}?response_fields=tlds,names.common,capitals.name,currencies.name,flag.url_svg,flag.url_png,flag.description,languages.name,population,region,subregion,borders`).pipe(map(res=> res.data.objects)) as Observable<IDetailsCard[]>;
  }

  getBorderByCode(code: string) {
    return this.http.get<IBorderResponse>(`${this.url}/codes.alpha_3/${code}?response_fields=names.common,codes.ccn3`).pipe(map(res=> res.data.objects)) as Observable<IBorder[]>;
  }
}
