import { Component, OnInit } from '@angular/core';
import { UF } from '../uf.model';
import { UfService } from 'src/app/core/services/uf.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-uf-list',
  templateUrl: './uf-list.component.html',
  styleUrls: ['./uf-list.component.css'],
  providers: [ConfirmationService]

})
export class UfListComponent implements OnInit {
  position: string;

  searchTerm: string;

  public paginaAtual = 1;
  pageSize = 10;

  

  key:string = 'codigoUF'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = true;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
  ufs: UF[] = [];
   list : any[];



  constructor(private ufService: UfService ,private confirmationService: ConfirmationService
    ) { 
      this.list = 
      [
        {name :'codigoUF',checked : false},
        {name :'nome',checked : false},
        {name :'sigla',checked : false},
        {name :'status',checked : false}
      ]
    }
   

  ngOnInit(): void {
    this.ufService.getAll().subscribe(
      ufs =>  this.ufs = ufs,
       error => alert ("Erro ao carregar a lista"),
     )
     

  }
  deleteUf(uf){
   console.log("deletando");


    this.confirmationService.confirm({
      message: 'Deseja realmente excluir este item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.ufService.delete(uf.codigoUF).subscribe(
          () => this.ufs = this.ufs.filter(element =>  element != uf),
          () => alert ("Erro ao tentar excluir!")
  
        )

    
    },
  
    key: "positionDialog"
  
  });


}


  

}
