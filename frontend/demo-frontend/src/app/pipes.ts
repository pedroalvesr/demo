import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

// export class FilterPipe implements PipeTransform {
//     transform(items: any[], filtro?: any): any {
//         console.log('filtro', filtro);
      
//         return filtro 
//             ? items.filter(item => item.nome.indexOf(filtro) !== -1)
//             : items;
//     }
// }

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

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], sortedBy: string): any {
        console.log('sortedBy', sortedBy);
        
        return items.sort((a, b) => {return b[sortedBy] - a[sortedBy]});
    }
}