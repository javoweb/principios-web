import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html'
})
export class AlbumTracksComponent implements OnInit {
  @Output() SaveCancel = new EventEmitter<boolean>();
  @Input() albumID: number | null = null;

  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  public trackForm: FormGroup;

  ngOnInit(): void {
    this.trackForm = this.formBuilder.group({
      duration: [
        null,
        [
          Validators.required,
          Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        ]
      ],
      name: [null, [Validators.required]]
    });
  }

  createTrack(): void {
    const toBeSaved = {
      name: this.trackForm.get('name').value,
      duration: this.trackForm.get('duration').value
    };

    this.albumService.addTrack(this.albumID, toBeSaved).subscribe(
      (status: boolean) => {
        const message = $localize`:generalPurpose|generalPurpose@@TrackAñadidoConExito:Track añadido exitosamente`;
        this.toastrService.success(message, $localize`:generalPurpose|generalPurpose@@Exito:Exito`, {
          closeButton: true
        });
        this.SaveCancel.emit(true);
      },
      error => {
        const message = $localize`:generalPurpose|generalPurpose@@ErrorAñadiendoElTrack:Error añadiendo el track ` + error.message;
        this.toastrService.error(message, $localize`:generalPurpose|generalPurpose@@Error:Error`, {
          closeButton: true
        });
        this.SaveCancel.emit(false);
      }
    );
  }

  cancelCreation(): void {
    this.SaveCancel.emit(false);
  }
}
