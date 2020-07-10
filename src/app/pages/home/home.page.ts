import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../services/models/pokemon.model';
import { ModalController } from '@ionic/angular';
import { TypeModalPage } from '../type-modal/type-modal.page';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: Pokemon[] = [];
  offset = 0;
  showSpinner = true;
  modal = null;
  filter = {
    type: null
  };

  constructor(private pokemonService: PokemonService,
              private modalController: ModalController,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async param => {
      if (param.type != null) {
        this.filter.type = param.type;
        this.pokemons = await this.pokemonService.getPokemonsByType(this.filter.type);
      } else {
        this.pokemons = await this.pokemonService.getAllPokemons(this.offset);
      }
      this.showSpinner = false;
    });
  }

  loadMore = (e) => {
    if (this.filter.type) {
      e.target.complete();
      return;
    }
    this.offset += 20;
    this.pokemonService.getAllPokemons(this.offset).then(pokemons => {
      this.pokemons = this.pokemons.concat(pokemons);
      e.target.complete();
    });
  }

  doRefresh = (e) => {
    this.pokemonService.clearCache();
    if (this.filter.type) {
      this.pokemonService.getPokemonsByType(this.filter.type).then(pokemons => {
        this.showSpinner = false;
        this.pokemons = pokemons;
        e.target.complete();
      });
    } else {
      this.pokemonService.getAllPokemons().then(pokemons => {
        this.pokemons = pokemons;
        this.offset = 0;
        e.target.complete();
      });
    }
  }

  detail = (pokemon: Pokemon) => {
    this.router.navigate(['/detail', pokemon.name]);
  }

  async presentModal() {
    this.modal = await this.modalController.create({
      component: TypeModalPage
    });
    return await this.modal.present();
  }

}
