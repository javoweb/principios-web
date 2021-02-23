import { Musician } from './musician';
import { Performer } from './performer';
import { PerformerPrize } from './performerPrize';

export class Band extends Performer {
  creationDate: Date;
  musicians: Musician[];
  constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    creationDate: Date,
    musicians: Musician[],
    performerPrizes: PerformerPrize[] = []
  ){
    super(id, name, image, description, performerPrizes);
    this.creationDate = creationDate;
    this.musicians = musicians;
  }

}
