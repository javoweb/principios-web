import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';


@Component({
  selector: 'app-album-detalle',
  templateUrl: './album-detalle.component.html',
  styleUrls: ['./album-detalle.component.scss']
})
export class AlbumDetalleComponent implements OnInit {

  @Input() albumID: number | null = null;

  album: Album = null;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(): void{

    if (this.albumID !== null )
    {
      this.albumService.getAlbum(this.albumID).subscribe(album => {
        this.album = album;
      });
    }

  }

  public getPerformerName(album: Album): string{

    return album.performers.map((x) => x.name ).join(',');

  }

}
