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
      catchError(this.handleError),
      map (this.jsonDataToUfs)
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
