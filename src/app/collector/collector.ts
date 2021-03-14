import { Performer } from '../performer/performer';
import { CollectorAlbum } from '../collector/collectorAlbum';

export class Collector {

  id: number;
  name: string;
  telephone: number;
  email: string;
  favoritePerformers: Performer[];
  collectorAlbums: CollectorAlbum[];

  constructor(
    id: number,
    name: string,
    telephone: number,
    email: string,
    favoritePerformers: Performer[],
    collectorAlbums: CollectorAlbum[]){
      this.id = id;
      this.name = name;
      this.telephone = telephone;
      this.email = email;
      this.favoritePerformers = favoritePerformers;
      this.collectorAlbums = collectorAlbums;
  }

}
