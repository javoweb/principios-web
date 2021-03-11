import { Prize } from './prize';

export class PerformerPrize {
  id: number;
  premiationDate: Date;
  prize: Prize | null;

  constructor(id: number, premiationDate: Date, prize: Prize = null){
    this.id = id;
    this.premiationDate = premiationDate;
    this.prize = prize;
  }
}
