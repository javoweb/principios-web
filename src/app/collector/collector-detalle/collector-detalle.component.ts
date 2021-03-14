import { Component, OnInit, Input } from '@angular/core';
import { Collector } from '../collector';
import { CollectorAlbum } from '../collectorAlbum';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-collector-detalle',
  templateUrl: './collector-detalle.component.html'
})
export class CollectorDetalleComponent implements OnInit {

  @Input() collectorID: number | null = null;
  collector: Collector = null;
  albumsFromCollector: Array<CollectorAlbum> = [];

  isOnfavoritePerformersEditMode: boolean;
  isOncollectorAlbumsEditMode: boolean;

  constructor(private collectorService: CollectorService) { }

  ngOnInit(): void {
    this.getCollector();
  }

  getCollector(): void{

    if (this.collectorID !== null )
    {
      this.collectorService.getCollector(this.collectorID).subscribe(collector => {
        this.collector = collector;
      });

      //se obtienen los albumes relacionados
      this.collectorService.getAlbumFromCollector(this.collectorID).subscribe(albumsFromCollector => {
        this.albumsFromCollector = albumsFromCollector;
      });


    }

  }

  public addFavoritePerformers(): void {
    this.isOnfavoritePerformersEditMode = true;
  }

  public addCollectorAlbums(): void {
    this.isOncollectorAlbumsEditMode = true;
  }

  public onFavoritePerformersStatusChanged(status: boolean): void {
    this.isOnfavoritePerformersEditMode = false;
    if (status) {
      this.getCollector();
    }
  }


  public onCollectorAlbumsStatusChanged(status: boolean): void {
    this.isOncollectorAlbumsEditMode = false;
    if (status) {
      this.getCollector();
    }
  }




}
