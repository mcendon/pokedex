import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../services/models/pokemon.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  pokemon: Pokemon;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if (param.name) {
        this.pokemonService.getPokemonData(param.name).subscribe(pokemon => {
          this.pokemon = pokemon;
        });
      }
    });
  }

}
