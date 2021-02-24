import { Performer } from '../performer/performer';

export class Collector {

  id: number;
  name: string;
  telephone: number;
  email: string;
  favoritePerformers: Performer[];

  constructor( id: number, name: string, telephone: number, email: string, favoritePerformers: Performer[]) {
    this.id = id;
    this.name = name;
    this.telephone = telephone;
    this.email = email;
    this.favoritePerformers = favoritePerformers;
  }

}
