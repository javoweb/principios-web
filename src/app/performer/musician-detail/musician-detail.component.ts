import { Component, Input, OnInit } from '@angular/core';
import { Musician } from '../musician';
import { PerformerPrize } from '../performerPrize';
import { PerformerPrizeService } from '../performerPrize.service';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-musician-detail',
  templateUrl: './musician-detail.component.html',
})
export class MusicianDetailComponent implements OnInit {

  constructor( private prizeService: PrizeService, private performerPrizeService: PerformerPrizeService) { }
  @Input()
  musician: Musician | null = null;
  performerPrizes: PerformerPrize[] = [];
  prizes: Prize[] = [];
  kind = 'musicians';

  public getPrizes(): void {
    this.prizes = [];
    this.musician.performerPrizes.forEach(performerPrize => {
      this.prizeService.getPrize(this.getPrizeId(performerPrize)).subscribe(prize => {
        this.prizes.push(prize);
      });
    });
  }

  public getPerformerPrizes(): void {
    if (this.musician != null) {
      this.performerPrizeService.getPerformerPrizes().subscribe(performerPrizes => {
        this.performerPrizes = performerPrizes;
        this.getPrizes();
      });
    }
  }

  public getPrizeId(performerPrize: PerformerPrize): number {
    return this.performerPrizes.find(pp => pp.id === performerPrize.id).id;
  }

  ngOnInit(): void {
    this.getPerformerPrizes();
  }
}
