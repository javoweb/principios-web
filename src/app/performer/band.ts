import { Performer } from './performer';

export class Band extends Performer {
  creationDate: Date;
  constructor(id: number, name: string, image: string, description: string, creationDate: Date){
    super(id, name, image, description);
    this.creationDate = creationDate;
  }

}
