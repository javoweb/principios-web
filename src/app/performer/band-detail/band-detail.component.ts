import { Component, OnInit } from '@angular/core';
import { Band } from '../band';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-band-detail',
  templateUrl: './band-detail.component.html',
  styleUrls: ['./band-detail.component.scss']
})
export class BandDetailComponent implements OnInit {

  constructor(private pizeService: PrizeService) { }

  band: Band | null = null;
  prizes: Prize[] = [];



  ngOnInit() {
  }

}
