import { PipeTransform, Pipe } from '@angular/core';
import { UF } from './uf.model';


@Pipe({
    name: 'ufFilter'
})
export class UFFilterPipe implements PipeTransform {

    transform(ufs: UF[], searchTerm: string): UF[] {
        if (!ufs || !searchTerm) {
            return ufs;
        }
            
     return ufs.filter(uf => 
        JSON.stringify(uf.codigoUF).toLowerCase().includes(searchTerm) ||
        (uf.nome).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (uf.sigla).toLowerCase().includes(searchTerm.toLowerCase())|| 
        JSON.stringify(uf.status).toLowerCase().includes(searchTerm)
        ); 
    }
}
