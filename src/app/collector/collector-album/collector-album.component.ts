import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Collector } from 'src/app/collector/collector';
import { CollectorService } from 'src/app/collector/collector.service';
import { AlbumService } from 'src/app/album/album.service';
import { Album } from 'src/app/album/album';


@Component({
  selector: 'app-collector-album',
  templateUrl: './collector-album.component.html'
})
export class CollectorAlbumComponent implements OnInit {
  @Output() SaveCancel = new EventEmitter<boolean>();
  @Input() collectorID: number | null = null;

  constructor(
    private collectorService: CollectorService,
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  public albums: Array<Album> = null;

  public albumForm: FormGroup;
  albumID: number = null;

  ngOnInit(): void {
    this.getAlbums();

    this.albumForm = this.formBuilder.group({
      albumId: [null, Validators.required],
      price: [null,
        [Validators.required, Validators.min(1), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ]
    });
  }

  getAlbums(): void {
    this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums;
    });
  }

  createAlbum(): void{

    const toBeSaved = {
      price: this.albumForm.get('price').value,
      status: 'Active'
    };

    const albumIDtoBeSaved = this.albumForm.get('albumId').value;

    this.collectorService.addAlbums(this.collectorID, albumIDtoBeSaved, toBeSaved).subscribe(
      (status: boolean) => {
        const message = $localize`:generalPurpose|generalPurpose@@AlbumCollectorCreadoConExito:Album a vender agregado exitosamente`;
        this.toastrService.success(message, $localize`:generalPurpose|generalPurpose@@Exito:Exito`, {
          closeButton: true
        });
        this.SaveCancel.emit(true);
      },
      error => {
        const message =
        $localize`:generalPurpose|generalPurpose@@ErrorGuardandoAlbumAVender:Error guardando album a vender ` +
        error.message;

        this.toastrService.error(message, $localize`:generalPurpose|generalPurpose@@Error:Error`, {
          closeButton: true
        });
        this.SaveCancel.emit(false);
      }
    );


  }

  changeAlbum(e): void{
    this.albumForm.get('albumId').setValue(e.target.value, {
      onlySelf: true
    });
  }

  cancelCreation(): void{
    this.SaveCancel.emit(false);
  }




}
