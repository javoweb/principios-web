import { Component, OnInit } from '@angular/core';
import { Musician } from './musician';
import { Band } from './band';
import { BandService } from './band.service';
import { MusicianService } from './musician.service';

@Component({
  selector: 'app-performer',
  templateUrl: './performer.component.html'
})
export class PerformerComponent implements OnInit {

  constructor(private bandaService: BandService, private musicoService: MusicianService) { }

  bandas: Array<Band> = [];
  musicos: Array<Musician> = [];
  selectedMusician: Musician | null = null;
  selectedBand: Band | null = null;
  isOnCreatePrizeMode = false;

  createPrizeMode(mode: boolean): void {
    this.isOnCreatePrizeMode = mode;
  }

  getBandList(): void {
    this.bandaService.getBands().subscribe(bandas => {
      this.bandas = bandas;
    });
  }

  getMusicianList(): void{
    this.musicoService.getMusicians().subscribe(musicos => {
      this.musicos = musicos;
    });
  }

  displayMusician(index: number): void {
    if (this.selectedMusician != null && this.selectedMusician.id === this.musicos[index].id) {
      this.selectedMusician = null;
      this.selectedBand = null;
    }
    else {
      this.selectedMusician = this.musicos[index];
      this.selectedBand = null;
    }
  }

  displayBand(index: number): void {
    if (this.selectedBand != null && this.selectedBand.id === this.bandas[index].id) {
      this.selectedBand = null;
      this.selectedMusician = null;
    }
    else {
      this.selectedBand = this.bandas[index];
      this.selectedMusician = null;
    }
  }

  public charToShow(index: number, kind: string = 'musician'): string {

    if (kind === 'musician') {
      if (this.selectedMusician != null && this.musicos[index].id === this.selectedMusician.id)
      {
          return '-';
      }
      else
      {
        return '+';
      }}
    else {
      if (this.selectedBand != null && this.bandas[index].id === this.selectedBand.id)
      {
          return '-';
      }
      else
      {
        return '+';
      }
    }

  }

  ngOnInit(): void {
    this.getBandList();
    this.getMusicianList();
  }

}
