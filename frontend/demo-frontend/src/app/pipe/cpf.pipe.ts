import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
	name: 'cpf'
})

export class CpfjPipe implements PipeTransform {
    
	/**
	 * Formata um CNPJ ou retorna o valor passado caso inválido. 
     * O CNPJ informado deve ser composto por 14 caracteres numéricos.
	 *
	 * @param string cnpj
	 * @return string
	 */
	transform(cpf: string): string {
        if (!cpf) {
           return '';
       }

       var cpfValor = cpf.replace(/\D/g, '');
    
        if (cpfValor.length !== 11) {
            return cpf;
        }
        
        var cpfLista = cpfValor.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        
        if (cpfLista && cpfLista.length === 5) {
            cpf = cpfLista[1] + '.' + cpfLista[2] + '.' + cpfLista[3] + '-' + cpfLista[4];
        }
        
        return cpf;
	}
}