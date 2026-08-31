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
  currencies: string = '';
  languages: string[] = [];
  image: IFlag = {url_svg: '',url_png: '', description: ''};
  borderCountries: IBorder[] = [];
  loading = false;
  borderLoading = false;
  constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(res=> {
      this.loading = true;
      this.dataService.getDataByCode(res.get('id')!).subscribe(response=> {
        this.card = response[0];
        this.image.url_svg = `url(${this.card.flag.url_svg}) no-repeat center / contain`;
        this.image.description = this.card.flag.description;
        this.languages = this.card.languages.map(language => language.name);
        this.currencies = this.card.currencies[0].name;
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
