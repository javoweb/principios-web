import { Component, Input, OnInit } from '@angular/core';
import { Band } from '../band';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';
import { PerformerPrizeService } from '../performerPrize.service';
import { PerformerPrize } from '../performerPrize';
import { BandService } from '../band.service';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html'
})
export class BandDetailComponent implements OnInit {

  constructor(private prizeService: PrizeService, private performerPrizeService: PerformerPrizeService, private bandService: BandService) { }
  @Input()
  band: Band | null = null;
  prizes: Prize[] = [];
  performerPrizes: PerformerPrize[] = [];
  kind = 'bands';
  isOnAssignPrizeMode = false;

  assignPrizeMode(mode: boolean): void {
    this.isOnAssignPrizeMode = mode;
  }

  public changePrizesState(state: boolean): void {
    this.assignPrizeMode(false);
    if (state) {
      this.updateState();
    }
  }

  public updateState(): void {
    this.bandService.getBand(this.band.id).subscribe(band => {
      this.band = band;
      this.getPerformerPrizes();
    });
  }

  public getPrizes(): void {
    this.prizes = [];
    this.band.performerPrizes.forEach(performerPrize => {
      this.prizeService.getPrize(this.getPrizeId(performerPrize)).subscribe(prize => {
        this.prizes.push(prize);
      });
    });
  }

  public getPerformerPrizes(): void {
    if (this.band != null) {
      this.performerPrizeService.getPerformerPrizes().subscribe(performerPrizes => {
        this.performerPrizes = performerPrizes;
        this.getPrizes();
      });
    }
  }

  public getPrizeId(performerPrize: PerformerPrize): number {
    return this.performerPrizes.find(pp => pp.id === performerPrize.id).prize.id;
  }

  ngOnInit(): void {
    this.getPerformerPrizes();
  }

}
