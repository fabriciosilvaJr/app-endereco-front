import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Municipio } from 'src/app/pages/municipios/municipio.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private api: string = (environment.api + "municipio"); 


  constructor(private http: HttpClient) { }

  getAll(): Observable<Municipio[] >{

    return this.http.get(`${this.api}`).pipe(
      map (this.jsonDataToMunicipios),
      catchError(this.handleError)
    )

  }

  getById(CODIGO: number): Observable<Municipio>{
    const url = `${this.api}?codigoMunicipio=${CODIGO}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToMunicipio),
      catchError(this.handleError)
    )

  }
  create(municipio: Municipio): Observable<Municipio>{
    return this.http.post(this.api, municipio).pipe(
      catchError(this.handleError),

    )
  }

  update(municipio: Municipio){
    const url = `${this.api}`;
    return this.http.put(url, municipio).pipe(
      map(() => municipio),
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

   private jsonDataToMunicipios(jsonData: any[]): Municipio[]{
    const municipios: Municipio[] = [];
    jsonData.forEach(element =>  municipios.push(element as Municipio));
    return municipios; 

  }

  private jsonDataToMunicipio (jsonData: any): Municipio{
    return jsonData as Municipio;
  }
  private handleError(error: any):Observable<any>{
    console.log("Erro na requisição =>", error);
    return throwError(error);

  }
}
