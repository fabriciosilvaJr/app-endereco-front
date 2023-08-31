import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BairroService } from 'src/app/core/services/bairro.service';
import { Bairro } from '../bairro.model';

@Component({
  selector: 'app-bairro-list',
  templateUrl: './bairro-list.component.html',
  styleUrls: ['./bairro-list.component.css'],
  providers: [ConfirmationService]

})
export class BairroListComponent implements OnInit {
  position: string;
  searchTerm: string;
  public paginaAtual = 1;
  pageSize = 10;
  key:string = 'codigoBairro'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = true;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
  bairros: Bairro[] = [];
   list : any[];

  constructor(private bairroService: BairroService ,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.bairroService.getAll().subscribe(
      bairros =>  this.bairros = bairros,
       error => alert ("Erro ao carregar a lista"),
     )
  }

  deleteBairro(bairro){
 
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir este item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.bairroService.delete(bairro.codigoBairro).subscribe(
          () => this.bairros = this.bairros.filter(element =>  element != bairro),
          () => alert ("Erro ao tentar excluir!")
  
        )
    },
  
    key: "positionDialog"
  
  });


}

}
