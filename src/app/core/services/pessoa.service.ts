import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Pessoa } from 'src/app/pages/pessoas/pessoa.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private api: string = (environment.api + "pessoa"); 


  constructor(private http: HttpClient) { }

  getAll(): Observable<Pessoa[] >{

    return this.http.get(`${this.api}`).pipe(
      map (this.jsonDataToPessoas),
      catchError(this.handleError)
    )

  }

  getById(CODIGO: number): Observable<Pessoa>{
    const url = `${this.api}?codigoPessoa=${CODIGO}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToPessoa),
      catchError(this.handleError)
    )

  }
  create(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.post(this.api, pessoa).pipe(
      catchError(this.handleError),

    )
  }

  update(pessoa: Pessoa){
    return this.http.put(this.api, pessoa).pipe(
      map(() => pessoa),
      catchError(this.handleError)
    )
  } 
  

  delete(CODIGO: number): Observable<any>{
  
    const url = `${this.api}/${CODIGO}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    ) 
  }


   //Private Methods

   private jsonDataToPessoas(jsonData: any[]): Pessoa[]{
    const pessoas: Pessoa[] = [];
    jsonData.forEach(element =>  pessoas.push(element as Pessoa));
    return pessoas; 

  }

  private jsonDataToPessoa (jsonData: any): Pessoa{
    return jsonData as Pessoa;
  }
  private handleError(error: any):Observable<any>{
    console.log("Erro na requisição =>", error);
    return throwError(error);

  }
}
