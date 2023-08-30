import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from '../pessoa.model';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css'],
  providers: [ConfirmationService]

})
export class PessoaListComponent implements OnInit {
  position: string;

  searchTerm: string;

  public paginaAtual = 1;
  pageSize = 10;

  key:string = 'CODIGO'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

  usuarios: Usuario[] = [];
  

  constructor(
    private usuarioService: UsuarioService, 
    private confirmationService: ConfirmationService
    ) { }



 isMobile = false;
 getIsMobile(): boolean {
   const w = document.documentElement.clientWidth;
   const breakpoint = 992;
   console.log(w);
   if (w < breakpoint) {
     return true;
   } else {
     return false;
   }
 }

 
  ngOnInit(): void {

    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
   

    this.usuarioService.getAll().subscribe(
     usuarios =>  this.usuarios = usuarios,
      error => alert ("Erro ao carregar a lista"),
    )
  }
  deleteUsuario(usuario){

      this.position = "right";


      this.confirmationService.confirm({
        message: 'Deseja realmente excluir este item?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.usuarioService.delete(usuario.CODIGO).subscribe(
            () => this.usuarios = this.usuarios.filter(element =>  element != usuario),
            () => alert ("Erro ao tentar excluir!")
    
          )

      
      },
    
      key: "positionDialog"
    
    });


  }


}
