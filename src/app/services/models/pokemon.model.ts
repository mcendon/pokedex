export interface PokemonData {
  name: string;
  specie: string;
  height: number;
  weight: number;
  frontImg: string;
  backImg: string;
}

export class Pokemon {
  constructor(private data: PokemonData) {}
  get name() {
    return this.data.name;
  }
  get specie() {
    return this.data.specie;
  }
  get height() {
    return this.data.height;
  }
  get weight() {
    return this.data.weight;
  }
  get frontImg() {
    return this.data.frontImg;
  }
  get backImg() {
    return this.data.backImg;
  }
}