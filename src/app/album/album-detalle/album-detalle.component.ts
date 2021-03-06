import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-detalle',
  templateUrl: './album-detalle.component.html'
})
export class AlbumDetalleComponent implements OnInit {
  @Input() albumID: number | null = null;

  album: Album = null;

  isOnCommentEditMode: boolean;

  isOnTrackEditMode: boolean;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(): void {
    if (this.albumID !== null) {
      this.albumService.getAlbum(this.albumID).subscribe(album => {
        this.album = album;
      });
    }
  }

  public getPerformerName(album: Album): string {
    return album.performers.map(x => x.name).join(',');
  }

  public addComment(): void {
    this.isOnCommentEditMode = true;
  }

  public addTrack(): void {
    this.isOnTrackEditMode = true;
  }


  public onCommentStatusChanged(status: boolean): void {
    this.isOnCommentEditMode = false;
    if (status) {
      this.getAlbum();
    }
  }


  public onTrackStatusChanged(status: boolean): void {
    this.isOnTrackEditMode = false;
    if (status) {
      this.getAlbum();
    }
  }
}
