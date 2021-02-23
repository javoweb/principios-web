import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';




@Component({
  selector: 'app-album-listar',
  templateUrl: './album-listar.component.html'
})
export class AlbumListarComponent implements OnInit {



  selectedAlbumID: number | null = null;
  albums: Array<Album> = [];

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
      this.getAlbums();
  }

  getAlbums(): void{

    this.albumService.getAlbums().subscribe(albums => {
      this.albums = albums;
    });

  }

  public getPerformerName(album: Album): string {

    return album.performers.map((x) => x.name ).join(',');

  }

  public displayAlbum(id: number): void
  {
      if (this.selectedAlbumID === id)
      {
        this.selectedAlbumID = null;
      }
      else
      {
        this.selectedAlbumID = id;
      }
  }

  public CharToShow(id: number): string {

    if (id === this.selectedAlbumID)
    {
        return '-';
    }
    else
    {
      return '+';
    }

  }


}
