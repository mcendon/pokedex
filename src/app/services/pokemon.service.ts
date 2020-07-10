import { Injectable } from '@angular/core';
import { Pokemon, PokemonData } from './models/pokemon.model';
import { HttpClient } from '@angular/common/http'
import { Observable, from } from 'rxjs';
import { map, concatAll } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PokemonType } from './models/pokemonType.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonEndpoint = 'pokemon';
  private typeEndpoint = 'type';

  constructor(private http: HttpClient) {
    const cacheId = environment.cache_id;
    if (!localStorage[cacheId]) {
      localStorage[cacheId] = '{}';
    }
  }

  getAllPokemons = (offset: number = 0, limit: number = 20): Promise<Pokemon[]> => (
    new Promise<Pokemon[]>((resolve, reject) => {
      this.http.get(environment.api_url + this.pokemonEndpoint + `?offset=${ offset + limit }&limit=${ limit }`).pipe(
        map((data: {results: any[]}): Promise<Pokemon>[] => {
          return data.results.map(item => this.getPokemonData(item.name).toPromise());
        })
      ).subscribe(pokemonPromises => {
        Promise.all(pokemonPromises).then(data => {
          resolve(data);
        }).catch(error => reject(error));
      }, error => reject(error));
    })
  )

  getPokemonsByType = (type: string): Promise<Pokemon[]> => (
    new Promise<Pokemon[]>((resolve, reject) => {
      this.http.get(environment.api_url + this.typeEndpoint + `/${ type }`).pipe(
        map((data: {pokemon: any[]}): Promise<Pokemon>[] => {
          return data.pokemon.map(item => this.getPokemonData(item.pokemon.name).toPromise());
        })
      ).subscribe(pokemonPromises => {
        Promise.all(pokemonPromises).then(data => {
          resolve(data);
        }).catch(error => reject(error));
      }, error => reject(error));
    })
  )

  getAllTypes = (): Promise<PokemonType[]> => (
    new Promise<PokemonType[]>((resolve, reject) => {
      this.http.get(environment.api_url + this.typeEndpoint).pipe(
        map((data: {results: any[]}) => {
          return data.results.map(item => new PokemonType(item.name));
        })
      ).subscribe(types => {
        resolve(types);
      }, error => reject(error));
    })
  )

  getPokemonData = (name: string): Observable<Pokemon> => {
    const fromCache = this.getFromCache(name);
    if (fromCache !== null) {
      return from([new Pokemon(fromCache)]);
    }
    return this.http.get(environment.api_url + this.pokemonEndpoint + `/${ name }`).pipe(
        map(({name, species, height, weight, sprites}: any) => new Promise<Pokemon>(resolve => {
          this.http.get(species.url).subscribe((speciesResult: any) => {
            const pokemonData: PokemonData = {
              name,
              specie: speciesResult.name,
              height,
              weight,
              frontImg: sprites.front_default,
              backImg: sprites.back_default
            };
            this.saveInCache(pokemonData);
            resolve(new Pokemon(pokemonData));
          });
        })),
        concatAll()
      );
  }

  clearCache = () => {
    const cacheId = environment.cache_id;
    delete localStorage[cacheId];
    localStorage[cacheId] = '{}';
  }

  private getFromCache = (name: string) => {
    const cacheId = environment.cache_id;
    const cacheObj = JSON.parse(localStorage[cacheId]);
    return name in cacheObj ? cacheObj[name] : null;
  }

  private saveInCache = (pokemonData: PokemonData) => {
    const cacheId = environment.cache_id;
    const cacheObj = JSON.parse(localStorage[cacheId]);
    const { name } = pokemonData;
    if (!(name in cacheObj)) {
      cacheObj[pokemonData.name] = pokemonData;
      localStorage[cacheId] = JSON.stringify(cacheObj);
    }
  }
}
