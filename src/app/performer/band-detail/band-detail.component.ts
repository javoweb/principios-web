import { Component, Input, OnInit } from '@angular/core';
import { Band } from '../band';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';
import { PerformerPrizeService } from '../performerPrize.service'
import { PerformerPrize } from '../performerPrize';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html'
})
export class BandDetailComponent implements OnInit {

  constructor(private prizeService: PrizeService, private performerPrizeService: PerformerPrizeService) { }
  @Input()
  band: Band | null = null;
  prizes: Prize[] = [];
  performerPrizes: PerformerPrize[] = []
  kind = 'bands';

  public getPrizes(): void {
    this.prizes = [];
    this.band.performerPrizes.forEach(performerPrize => {
      this.prizeService.getPrize(this.getPrizeId(performerPrize)).subscribe(prize => {
        this.prizes.push(prize);
      });
    });
  }

  public getPerformerPrizes(): void {
    this.performerPrizeService.getPerformerPrizes().subscribe(performerPrizes => {
      this.performerPrizes = performerPrizes;
      this.getPrizes();
    });
  }

  public getPrizeId(performerPrize: PerformerPrize): number {
    return this.performerPrizes.find(pp => pp.id === performerPrize.id).id;
  }

  ngOnInit(): void {
    if (this.band != null) {
      this.getPerformerPrizes();
    }
  }

}
