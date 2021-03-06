import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Collector } from 'src/app/collector/collector';
import { CollectorService } from 'src/app/collector/collector.service';
import { Album } from '../album';
import { Comment } from '../comment';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-comentarios',
  templateUrl: './album-comentarios.component.html'
})
export class AlbumComentariosComponent implements OnInit {
  @Output() SaveCancel = new EventEmitter<boolean>();
  @Input() albumID: number | null = null;

  constructor(
    private albumService: AlbumService,
    private collectorService: CollectorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  public collectors: Array<Collector> = null;
  public commentForm: FormGroup;
  comment: Comment = null;
  collectorID: number = null;

  ngOnInit(): void {
    this.getCollectors();
    this.commentForm = this.formBuilder.group({
      rating: [
        null,
        [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          Validators.min(0),
          Validators.max(5)
        ]
      ],
      description: [null, [Validators.required, Validators.maxLength(240)]],
      collectorId: [null, Validators.required]
    });
  }

  getCollectors(): void {
    this.collectorService.getCollectors().subscribe(collectors => {
      this.collectors = collectors;
    });
  }

  createComment(): void {
    const toBeSaved = {
      description: this.commentForm.get('description').value,
      rating: this.commentForm.get('rating').value,
      collector: { id: this.commentForm.get('collectorId').value }
    };

    this.albumService.addComment(this.albumID, toBeSaved).subscribe(
      (status: boolean) => {
        const message = $localize`:generalPurpose|generalPurpose@@CometarioCreadoConExito:Comentario creado exitosamente`;
        this.toastrService.success(message, $localize`:generalPurpose|generalPurpose@@Exito:Exito`, {
          closeButton: true
        });
        this.SaveCancel.emit(true);
      },
      error => {
        const message = $localize`:generalPurpose|generalPurpose@@:Error guardando el comentario ` + error.message;
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

  changeCollector(e): void {
    this.commentForm.get('collectorId').setValue(e.target.value, {
      onlySelf: true
    });
  }
}
