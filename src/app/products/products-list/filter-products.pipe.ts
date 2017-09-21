import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProducts implements PipeTransform {
  transform(items: any[], filter: Object): any {
    if (filter) {
      return items.filter(c => c.category === filter);
    } else {
      return items;
    }
  }
}
