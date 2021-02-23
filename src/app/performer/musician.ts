import { Performer } from './performer';
import { PerformerPrize } from './performerPrize';

export class Musician extends Performer {
  birthDate: Date;

  constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    birthDate: Date,
    performerPrizes: PerformerPrize[] = []
  ){
    super(id, name, image, description, performerPrizes);
    this.birthDate = birthDate;
  }
}
