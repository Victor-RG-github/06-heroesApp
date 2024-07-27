import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { tap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  searchInput = new FormControl('');
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  searchHero(): void {
    const value: string = this.searchInput.value || '';
    if (value.length > 2) {
      this.heroService
        .getSuggestions(value)
        .subscribe((heroes) => (this.heroes = heroes));
    }
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
