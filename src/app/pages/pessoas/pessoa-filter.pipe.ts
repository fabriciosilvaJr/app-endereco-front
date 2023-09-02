import { PipeTransform, Pipe } from '@angular/core';
import { Pessoa } from './pessoa.model';


@Pipe({
    name: 'pessoaFilter'
})
export class PessoaFilterPipe implements PipeTransform {

    transform(pessoas: Pessoa[], searchTerm: string): Pessoa[] {
        if (!pessoas || !searchTerm) {
            return pessoas;
        }
            
     return pessoas.filter(pessoa => 
        JSON.stringify(pessoa.codigoPessoa).toLowerCase().includes(searchTerm) ||
        (pessoa.nome).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pessoa.login).toLowerCase().includes(searchTerm.toLowerCase())|| 
        JSON.stringify(pessoa.status).toLowerCase().includes(searchTerm.toLowerCase())
        
        ); 
    }
}
