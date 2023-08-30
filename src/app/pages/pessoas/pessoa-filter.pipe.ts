import { PipeTransform, Pipe } from '@angular/core';
import { Usuario } from './pessoa.model';


@Pipe({
    name: 'pessoaFilter'
})
export class PessoaFilterPipe implements PipeTransform {

    transform(usuarios: Usuario[], searchTerm: string): Usuario[] {
        if (!usuarios || !searchTerm) {
            return usuarios;
        }
            
     return usuarios.filter(usuario => 
        JSON.stringify(usuario.CODIGO).toLowerCase().includes(searchTerm) ||
        (usuario.NOME).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (usuario.EMAIL).toLowerCase().includes(searchTerm.toLowerCase())|| 
        JSON.stringify(usuario.COD_PERFIL_USUARIO).toLowerCase().includes(searchTerm.toLowerCase())
        
        ); 
    }
}
