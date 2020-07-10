import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonType } from '../../services/models/pokemonType.model';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-type-modal',
  templateUrl: './type-modal.page.html',
  styleUrls: ['./type-modal.page.scss'],
})
export class TypeModalPage implements OnInit {
  types: PokemonType[];

  constructor(private pokemonService: PokemonService, private router: Router, private modalController: ModalController) {}

  ngOnInit() {
    this.pokemonService.getAllTypes().then(types => this.types = types);
  }

  filterPokemons = (type: string) => {
    this.router.navigate(['home', 'filter', type]);
    this.modalController.dismiss();
  }
}
