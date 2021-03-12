import { PerformerPrize } from './performerPrize';

export class Prize {
  id: number;
  organization: string;
  name: string;
  description: string;
  performerPrizes: PerformerPrize[];

  constructor(
    id: number,
    organization: string,
    name: string,
    description: string,
    performerPrizes: PerformerPrize[]
  ) {
      this.id = id;
      this.organization = organization;
      this.name = name;
      this.description = description;
      this.performerPrizes = performerPrizes;
  }
}
