import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], filtro: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!filtro || !value) {
            return items;
        }

        return items.filter(singleItem => singleItem[filtro].toLowerCase().includes(value.toLowerCase()));
    }
}
