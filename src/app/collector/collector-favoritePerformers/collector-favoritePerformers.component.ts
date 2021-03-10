import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Collector } from 'src/app/collector/collector';
import { CollectorService } from 'src/app/collector/collector.service';
import { BandService } from 'src/app/performer/band.service';
import { MusicianService } from 'src/app/performer/musician.service';
import { Performer } from 'src/app/performer/performer';
import { Band } from 'src/app/performer/band';
import { Musician } from 'src/app/performer/musician';


@Component({
  selector: 'app-collector-favoriteperformers',
  templateUrl: './collector-favoritePerformers.component.html'
})
export class CollectorFavoritePerformersComponent implements OnInit {
  @Output() SaveCancel = new EventEmitter<boolean>();
  @Input() collectorID: number | null = null;

  constructor(
    private collectorService: CollectorService,
    private bandService: BandService,
    private musicianService: MusicianService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  public bands: Array<Band> = null;
  public musicians: Array<Musician> = null;

  public favoritePerformerForm: FormGroup;
  performerFavorite: Performer = null;
  performerID: number = null;

  ngOnInit(): void {
    this.getPerformers();

    this.favoritePerformerForm = this.formBuilder.group({
      performerId: [null, Validators.required]
    });
  }


  getPerformers(): void {
    this.bandService.getBands().subscribe(bands => {
      this.bands = bands;
    });
  }

  createFavoritePerformer(): void{


    const toBeSaved = {
    };

    const performerIDtoBeSaved = this.favoritePerformerForm.get('performerId').value;

    this.collectorService.addfavoritePerformers(this.collectorID, performerIDtoBeSaved, toBeSaved).subscribe(
      (status: boolean) => {
        const message = $localize`:generalPurpose|generalPurpose@@ArtistaFavoritoCreadoConExito:Artista favorito agregado exitosamente`;
        this.toastrService.success(message, $localize`:generalPurpose|generalPurpose@@Exito:Exito`, {
          closeButton: true
        });
        this.SaveCancel.emit(true);
      },
      error => {
        const message = $localize`:generalPurpose|generalPurpose@@:Error guardando el artista favorito ` + error.message;
        this.toastrService.error(message, $localize`:generalPurpose|generalPurpose@@Error:Error`, {
          closeButton: true
        });
        this.SaveCancel.emit(false);
      }
    );


  }

  changePerformer(e): void{
    this.favoritePerformerForm.get('performerId').setValue(e.target.value, {
      onlySelf: true
    });
  }

  cancelCreation(): void{
    this.SaveCancel.emit(false);
  }



}
