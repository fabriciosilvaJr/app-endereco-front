import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UF } from 'src/app/pages/ufs/uf.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UfService {
  private api: string = (environment.api + "uf" ) 

  constructor(private http: HttpClient) { }

  getAll(): Observable<UF[] >{

    return this.http.get(`${this.api}`).pipe(
      map (this.jsonDataToUfs),
      catchError(this.handleError)
    )

  }

  getById(CODIGO: number): Observable<UF>{
    const url = `${this.api}?codigoUF=${CODIGO}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToUF),
      catchError(this.handleError)
    )

  }
  create(uf: UF): Observable<UF>{
    return this.http.post(this.api, uf).pipe(
      catchError(this.handleError),

    )
  }

  update(uf: UF){
    const url = `${this.api}`;
    return this.http.patch(url, uf).pipe(
      map(() => uf),
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

   private jsonDataToUfs(jsonData: any[]): UF[]{
    const ufs: UF[] = [];
    jsonData.forEach(element =>  ufs.push(element as UF));
    return ufs; 

  }

  private jsonDataToUF (jsonData: any): UF{
    return jsonData as UF;
  }
  private handleError(error: any):Observable<any>{
    console.log("Erro na requisição =>", error);
    return throwError(error);

  }
}
