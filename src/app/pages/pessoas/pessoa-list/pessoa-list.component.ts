import { Component, OnInit } from '@angular/core';
import { PessoaService } from 'src/app/core/services/pessoa.service';
import { Pessoa } from '../pessoa.model';
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

  pessoas: Pessoa[] = [];
  

  constructor(
    private pessoaService: PessoaService, 
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
   

    this.pessoaService.getAll().subscribe(
     pessoas =>  this.pessoas = pessoas,
      error => alert ("Erro ao carregar a lista"),
    )
  }
  deletePessoa(pessoa){
      this.position = "right";
      this.confirmationService.confirm({
        message: 'Deseja realmente excluir este item?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.pessoaService.delete(pessoa.codigoPessoa).subscribe(
            () => this.pessoas = this.pessoas.filter(element =>  element != pessoa),
            () => alert ("Erro ao tentar excluir!")
    
          )

      
      },
    
      key: "positionDialog"
    
    });


  }


}
