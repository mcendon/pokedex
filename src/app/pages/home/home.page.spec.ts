import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from './home.page';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../services/models/pokemon.model';
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NoimagePipe } from '../../pipe/noimage.pipe';


describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let params: Subject<any>;
  beforeEach(async(() => {
    params = new Subject<any>();
    TestBed.configureTestingModule({
      declarations: [ HomePage, NoimagePipe ],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers:[
        {
          provide: PokemonService,
          useValue: {
            getAllPokemons: (offset: number = 0, limit: number = 20): Promise<Pokemon[]> => (
              new Promise<Pokemon[]>(resolve => {
                resolve([
                  new Pokemon({name: 'Pikachu', specie: 'Pikachu', weight: 10, height: 1, backImg: '', frontImg: ''}),
                  new Pokemon({name: 'Bulbasaur', specie: 'Bulbasaur', weight: 10, height: 1, backImg: '', frontImg: ''}),
                  new Pokemon({name: 'Dragonite', specie: 'Dragonite', weight: 10, height: 1, backImg: '', frontImg: ''}),
                  new Pokemon({name: 'Squirle', specie: 'Squirle', weight: 10, height: 1, backImg: '', frontImg: ''}),
                  new Pokemon({name: 'Psyduck', specie: 'Psyduck', weight: 10, height: 1, backImg: '', frontImg: ''}),
                ]);
              })
            ),
            getPokemonsByType: (type: string): Promise<Pokemon[]> => (
              new Promise<Pokemon[]>(resolve => {
                resolve([
                  new Pokemon({name: 'Pikachu', specie: 'Pikachu', weight: 10, height: 1, backImg: '', frontImg: ''})
                ]);
              })
            )
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pokemons', async () => {
    expect(component.pokemons).toBeDefined();
    expect(component.pokemons.length).toEqual(0);
    fixture.detectChanges(); //calls ngOnInit
    params.next({});
    await fixture.whenStable(); //wait async work
    fixture.detectChanges();
    expect(component.pokemons.length).toEqual(5);
    expect(component.pokemons[1]).toBeInstanceOf(Pokemon);
    expect(component.pokemons[1].name).toEqual('Bulbasaur');
  });

  it('should load more pokemons', async () => {
    params.next({});
    expect(component.pokemons).toBeDefined();
    expect(component.pokemons.length).toEqual(0);
    fixture.detectChanges(); //calls ngOnInit
    params.next({});
    await fixture.whenStable();  //wait async work
    fixture.detectChanges();
    expect(component.pokemons.length).toEqual(5);
    component.loadMore(
      {
        target: {
          complete: () => {
            expect(component.pokemons.length).toEqual(10);
          }
        }
      }
    );
  });

  it('should filter pokemons', async () => {
    expect(component.pokemons).toBeDefined();
    expect(component.pokemons.length).toEqual(0);
    fixture.detectChanges(); //calls ngOnInit
    params.next({type: 'electric'}); //emit value with filter parameter
    await fixture.whenStable(); //wait async work
    fixture.detectChanges();
    expect(component.pokemons.length).toEqual(1);
    expect(component.pokemons[0].name).toEqual('Pikachu');
  });

  it('should hide spinner after load', async () => {
    expect(component.showSpinner).toBeTruthy();
    fixture.detectChanges(); //calls ngOnInit
    params.next({});
    await fixture.whenStable(); //wait async work
    fixture.detectChanges();
    expect(component.showSpinner).toBeFalsy();
  });
});
