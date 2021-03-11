import { Prize } from './prize';

export class PerformerPrize {
  id: number;
  premiationDate: Date;
  prizes: Prize[];

  constructor(id: number, premiationDate: Date, prizes: Prize[] = []){
    this.id = id;
    this.premiationDate = premiationDate;
    this.prizes = prizes;
  }
}
