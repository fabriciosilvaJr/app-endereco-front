import { PipeTransform, Pipe } from '@angular/core';
import { Bairro } from './bairro.model';


@Pipe({
    name: 'bairroFilter'
})
export class BairroFilterPipe implements PipeTransform {

    transform(bairros: Bairro[], searchTerm: string): Bairro[] {
        if (!bairros || !searchTerm) {
            return bairros;
        }
            
     return bairros.filter(bairro => 
        JSON.stringify(bairro.codigoBairro).toLowerCase().includes(searchTerm) ||
        (bairro.nome).toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(bairro.codigoMunicipio).toLowerCase().includes(searchTerm)||
        JSON.stringify(bairro.status).toLowerCase().includes(searchTerm)
       
        ); 
    }
}
