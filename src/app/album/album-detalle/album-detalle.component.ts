import { Component, OnInit } from '@angular/core';
import { Album } from '../album'
import { AlbumService } from  '../album.service'


@Component({
  selector: 'app-album-detalle',
  templateUrl: './album-detalle.component.html',
  styleUrls: ['./album-detalle.component.scss']
})
export class AlbumDetalleComponent implements OnInit {

  album: Album=null;

  constructor(private albumService:AlbumService) { }

  ngOnInit() {
    this.getAlbum();
  }

  getAlbum(): void{

    this.albumService.getAlbum(100).subscribe(album=>{
      this.album=album;
    });

  }

  public getPerformerName(album:Album):string{

    return album.performers.map((x)=>x.name ).join(",");

  }

}
