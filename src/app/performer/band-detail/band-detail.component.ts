import { Component, Input, OnInit } from '@angular/core';
import { Band } from '../band';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html'
})
export class BandDetailComponent implements OnInit {

  constructor(private prizeService: PrizeService) { }
  @Input()
  band: Band | null = null;
  prizes: Prize[] = [];

  public getPrizes(): void {
    this.prizes = [];
    if (this.band != null) {
      this.band.performerPrizes.forEach(performerPrize => {
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
