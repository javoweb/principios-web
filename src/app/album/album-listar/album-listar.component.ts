import { Component, OnInit } from '@angular/core';
import { Album } from '../album'
import { AlbumService } from  '../album.service'

@Component({
  selector: 'app-album-listar',
  templateUrl: './album-listar.component.html',
  styleUrls: ['./album-listar.component.scss']
})
export class AlbumListarComponent implements OnInit {

  albums: Array<Album>=[];

  constructor(private albumService:AlbumService) { }

  ngOnInit() {
    //this.getAlbums();
  }

  getAlbums(): void{

    this.albumService.getAlbums().subscribe(albums=>{
      this.albums=albums;
    });

  }

  public getPerformerName(album:Album):string{

    return album.performers.map((x)=>x.name ).join(",");

  }

}
