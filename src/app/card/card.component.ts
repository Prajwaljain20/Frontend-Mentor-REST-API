import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ICard } from '../models/card-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() cards!: ICard;
  cardObj!: ICard;
  image: string = '';
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.image = `url(${this.cards.flags.svg}) no-repeat center / cover`;
  }
}
