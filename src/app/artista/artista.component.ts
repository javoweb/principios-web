import { Component, OnInit } from '@angular/core';
import { Musico } from './musico';
import { Banda } from './banda';
import { BandaService } from './banda.service';
import { MusicoService } from './musico.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  constructor(private bandaService: BandaService, private musicoService: MusicoService) { }

  bandas: Array<Banda>;
  musicos: Array<Musico>;

  getBandaList(): void {
    this.bandaService.getBandas().subscribe(bandas => {
      this.bandas = bandas;
    });
  }

  getMusicoList(): void{
    this.musicoService.getMusicos().subscribe(musicos => {
      this.musicos = musicos;
    });
  }

  ngOnInit(): void {
    this.getBandaList();
    this.getMusicoList();
  }

}
