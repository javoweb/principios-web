import { PerformerPrize } from "./performerPrize";

export class Prize {
  organization: string;
  name: string;
  description: string;
  performerPrizes: PerformerPrize[];

  constructor(
    organization: string,
    name: string,
    description: string,
    performerPrizes: PerformerPrize[] = []
  ) {
      this.organization = organization;
      this.name = name;
      this.description = description;
      this.performerPrizes = performerPrizes;
  }
}
