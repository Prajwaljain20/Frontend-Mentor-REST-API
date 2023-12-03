import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import { IDetailsCard, IFlag } from '../models/details-card-interface';
import { IBorder } from '../models/border-interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  card!: IDetailsCard;
  currencies: string[] = [];
  languages: string[] = [];
  image: IFlag = {svg: '',png: '', alt: ''};
  borderCountries: IBorder[] = [];
  loading = false;
  borderLoading = false;
  constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res=> {
      this.loading = true;
      this.dataService.getDataByCode(res.get('id')!).subscribe(response=> {
        this.card = response[0];
        this.image.svg = `url(${this.card.flags.svg}) no-repeat center / contain`;
        this.image.alt = this.card.flags.alt;
        this.languages = Object.values(this.card.languages);
        const currency = Object.keys(this.card.currencies);
        this.currencies = [];
        currency.forEach(val => this.currencies.push(this.card.currencies[val].name));
        this.borderCountries = [];
        this.card.borders.forEach(border => {
          this.borderLoading = true;
          this.dataService.getBorderByCode(border).subscribe(country => {
            this.borderCountries.push(country[0]);
            this.borderLoading = false;
          });
        });
        this.loading = false;
      });
    });
  }

  goBack(): void {
    this.location.back();
  }
}
