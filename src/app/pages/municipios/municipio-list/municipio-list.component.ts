import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MunicipioService } from 'src/app/core/services/municipio.service';
import { Municipio } from '../municipio.model';

@Component({
  selector: 'app-municipio-list',
  templateUrl: './municipio-list.component.html',
  styleUrls: ['./municipio-list.component.css'],
  providers: [ConfirmationService]

})
export class MunicipioListComponent implements OnInit {

  position: string;

  searchTerm: string;

  public paginaAtual = 1;
  pageSize = 10;

  key:string = 'codigoMunicipio'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = true;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }
  municipios: Municipio[] = [];
   list : any[];

  constructor(private municipioService: MunicipioService ,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.municipioService.getAll().subscribe(
      municipios =>  this.municipios = municipios,
       error => alert ("Erro ao carregar a lista"),
     )
  }
  deleteUf(municipio){
 
     this.confirmationService.confirm({
       message: 'Deseja realmente excluir este item?',
       header: 'Delete Confirmation',
       icon: 'pi pi-info-circle',
       accept: () => {
         this.municipioService.delete(municipio.codigoMunicipio).subscribe(
           () => this.municipios = this.municipios.filter(element =>  element != municipio),
           () => alert ("Erro ao tentar excluir!")
   
         )
 
     
     },
   
     key: "positionDialog"
   
   });
 
 
 }

}
