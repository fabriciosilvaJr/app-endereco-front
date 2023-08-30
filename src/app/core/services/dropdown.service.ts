import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cidade } from '../models/cidade.model';
import { EstadoBr } from '../models/estado-br.model';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBR(){
    return this.http.get<EstadoBr[]>('assets/dados/Estados.json')
  }
  getCidades(idEstado:any){
    return this.http.get<Cidade[]>('assets/dados/Cidades.json')
    .pipe(
      map((cidades:Cidade[]) => cidades.filter(c => c.Estado == idEstado))

    );

  }
}
