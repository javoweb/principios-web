import { Artista } from "./artista";

export class Musico extends Artista {
  birthDate: Date;
  constructor(id: number, name: string, image: string, description: string, birthDate: Date){
    super(id, name, image, description);
    this.birthDate = birthDate;
  }
}
