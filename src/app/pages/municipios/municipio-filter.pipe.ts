import { PipeTransform, Pipe } from '@angular/core';
import { Municipio } from './municipio.model';


@Pipe({
    name: 'municipioFilter'
})
export class MunicipioFilterPipe implements PipeTransform {

    transform(municipios: Municipio[], searchTerm: string): Municipio[] {
        if (!municipios || !searchTerm) {
            return municipios;
        }
            
     return municipios.filter(municipio => 
        JSON.stringify(municipio.codigoMunicipio).toLowerCase().includes(searchTerm) ||
        (municipio.nome).toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(municipio.codigoUF).toLowerCase().includes(searchTerm)||
        JSON.stringify(municipio.status).toLowerCase().includes(searchTerm)
       
        ); 
    }
}
