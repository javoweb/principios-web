export class Performer {

  id: number;
  name: string;
  image: string;
  description: string;
  birthDate: string;

  constructor(
    id: number,
    name: string,
    image: string,
    description: string,
    birthDate: string
  ) {
    this.name = name;
    this.image = image;
    this.description = description;
    this.birthDate = birthDate;
  }
}
