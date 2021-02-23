import { PerformerPrize } from './performerPrize';

export class Performer {
  id: number;
  name: string;
  image: string;
  description: string;
  performerPrizes: PerformerPrize[];

  public constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    performerPrizes: PerformerPrize[] = []
  ) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.performerPrizes = performerPrizes;
  }
}
