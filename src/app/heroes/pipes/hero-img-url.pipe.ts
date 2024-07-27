import { Pipe, type PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImgUrl',
})
export class HeroImgUrlPipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.id && !hero.alt_image) return 'assets/no-image.png';

    if (hero.alt_image) return hero.alt_image;

    return 'assets/heroes/' + hero.id + '.jpg';
  }
}
