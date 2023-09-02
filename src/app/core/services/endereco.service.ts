import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endereco } from 'src/app/pages/enderecos/endereco.model';


@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private enderecoDataSubject = new BehaviorSubject<any>(null);
  private enderecos: any[] = [];

  setEnderecoData(data: Endereco) {
    this.enderecoDataSubject.next(data);
  }

  getEnderecoData(): Observable<Endereco> {
    return this.enderecoDataSubject.asObservable();
  }

  clearEnderecoData() {
    this.enderecos = null;
    this.enderecoDataSubject.next(null);
  }
}
