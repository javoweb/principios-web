import { Artista } from "./artista";

export class Banda extends Artista {
  creationDate: Date;
  constructor(id: number, name: string, image: string, description: string, creationDate: Date){
    super(id, name, image, description);
    this.creationDate = creationDate;
  }

}
