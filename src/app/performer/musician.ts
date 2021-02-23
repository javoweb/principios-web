import { Performer } from './performer';

export class Musician extends Performer {
  birthDate: Date;
  constructor(id: number, name: string, image: string, description: string, birthDate: Date){
    super(id, name, image, description);
    this.birthDate = birthDate;
  }
}
