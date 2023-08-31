import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Bairro } from 'src/app/pages/bairros/bairro.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BairroService {
  private api: string = (environment.api + "bairro"); 


  constructor(private http: HttpClient) { }

  getAll(): Observable<Bairro[] >{

    return this.http.get(`${this.api}`).pipe(
      map (this.jsonDataToBairros),
      catchError(this.handleError)
    )

  }

  getById(CODIGO: number): Observable<Bairro>{
    const url = `${this.api}?codigoBairro=${CODIGO}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToBairro),
      catchError(this.handleError)
    )

  }
  create(bairro: Bairro): Observable<Bairro>{
    return this.http.post(this.api, bairro).pipe(
      catchError(this.handleError),

    )
  }

  update(bairro: Bairro){
    const url = `${this.api}`;
    return this.http.put(url, bairro).pipe(
      map(() => bairro),
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

   private jsonDataToBairros(jsonData: any[]): Bairro[]{
    const bairros: Bairro[] = [];
    jsonData.forEach(element =>  bairros.push(element as Bairro));
    return bairros; 

  }

  private jsonDataToBairro (jsonData: any): Bairro{
    return jsonData as Bairro;
  }
  private handleError(error: any):Observable<any>{
    console.log("Erro na requisição =>", error);
    return throwError(error);

  }
}
