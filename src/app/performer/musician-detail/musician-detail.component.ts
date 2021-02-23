import { Component, Input, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-musician-detail',
  templateUrl: './musician-detail.component.html',
})
export class MusicianDetailComponent implements OnInit {

  constructor( private prizeService: PrizeService) { }
  @Input()
  musician: Musician | null = null;
  prizes: Prize[] = [];

  public getPrizes(): void {
    this.prizes = [];
    if (this.musician != null) {
      this.musician.performerPrizes.forEach(performerPrize => {
        this.prizeService.getPrize(performerPrize.id).subscribe(prize => {
          this.prizes.push(prize);
        });
      });
    }
  }

  ngOnInit(): void {
    this.getPrizes();
  }
}
