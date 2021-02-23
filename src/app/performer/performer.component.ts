import { Component, OnInit } from '@angular/core';
import { Musician } from './musician';
import { Band } from './band';
import { BandService } from './band.service';
import { MusicianService } from './musician.service';

@Component({
  selector: 'app-performer',
  templateUrl: './performer.component.html',
  styleUrls: ['./performer.component.css']
})
export class PerformerComponent implements OnInit {

  constructor(private bandaService: BandService, private musicoService: MusicianService) { }

  bandas: Array<Band> = [];
  musicos: Array<Musician> = [];

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

  ngOnInit(): void {
    this.getBandList();
    this.getMusicianList();
  }

}
