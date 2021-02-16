export class Artista {
  id: number;
  name: string;
  image: string;
  description: string;

  public constructor(id: number, name: string, image: string, description: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
  }
}
