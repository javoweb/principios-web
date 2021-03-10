import { Performer } from '../performer/performer';
import { Album } from '../album/album';

export class Collector {

  id: number;
  name: string;
  telephone: number;
  email: string;
  favoritePerformers: Performer[];
  collectorAlbums: Album[];

  constructor( id: number, name: string, telephone: number, email: string, favoritePerformers: Performer[], collectorAlbums: Album[]) {
    this.id = id;
    this.name = name;
    this.telephone = telephone;
    this.email = email;
    this.favoritePerformers = favoritePerformers;
    this.collectorAlbums = collectorAlbums;
  }

}
