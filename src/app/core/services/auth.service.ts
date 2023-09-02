import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pessoa } from 'src/app/pages/pessoas/pessoa.model';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
    ID = window.localStorage.getItem('id');

  private api: string = (environment.api + "pessoa" ) 
 

  private subjPessoa$: BehaviorSubject<Pessoa> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject(false);


  constructor(private http: HttpClient, private router: Router) { }

  

  register(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.post<Pessoa>(`${this.api}/cadastro`,pessoa).pipe(
      catchError(this.handleError)

    )
    
  }


 login(credentials: {login: string, senha: string}): Observable<Pessoa>{
   return this.http.post<Pessoa>(`${this.api}/login`, credentials)
  //  return this.http.post( this.api + 'auth',credentials)
   .pipe(
     tap((u:any)=>{
        localStorage.setItem('token',u.token);
        localStorage.setItem('id',u.data.id.toString());
        // localStorage.setItem('role',u.COD_PERFIL_USUARIO.toString());
         localStorage.setItem('nome',u.data.name.toString());
        localStorage.setItem('guid',u.GUID);
        this.subjLoggedIn$.next(true);
        this.subjPessoa$.next(u);
        //console.log(u);
     })
   )
 }

 forgot(pessoa: Pessoa){
  const url = `${this.api}/forgot-password`;
  return this.http.put(url, pessoa).pipe(
    map(() => pessoa),
    catchError(this.handleError)
  )
} 
reset(pessoa: Pessoa){
  const url = `${this.api}/reset-password`;
  return this.http.put(url, pessoa).pipe(
    map(() => pessoa),
    catchError(this.handleError)
  )
} 

 isAuthenticated(): Observable<any> {
  const token = localStorage.getItem('token');
  if (token && !this.subjLoggedIn$.value) {
    return this.checkTokenValidation();
  }
  return this.subjLoggedIn$.asObservable();
}
 checkTokenValidation(): Observable<boolean> {
  return this.http
    .get<Pessoa>(`${this.api}`)
    .pipe(
      tap((u: Pessoa) => {
        if (u) {
          this.subjLoggedIn$.next(true);
          this.subjPessoa$.next(u);
        }
      }),
      map((u: Pessoa) => (u)?true:false),
      catchError((err) => {
        // this.logout();
        return of(false);
      })
    );
}
 getUser():Observable<Pessoa>{

  return this.subjPessoa$.asObservable();

 }
 
 logout(user:any): Observable<Pessoa>{
  return this.http.post<Pessoa>(`${this.api}/logout`, user)
 //  return this.http.post( this.api + 'auth',credentials)
  .pipe(
    tap(()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('nome');
      localStorage.removeItem('id');
       window.location.reload();
      this.subjLoggedIn$.next(false);
      this.subjPessoa$.next(null);
       //console.log(u);
    })
  )
}

 logoff(){

   localStorage.removeItem('token');
   localStorage.removeItem('nome');
   localStorage.removeItem('id');
   this.subjLoggedIn$.next(false);
   this.subjPessoa$.next(null);

 }

 private handleError(error: any):Observable<any>{
  console.log("Erro na requisição =>", error);
  return throwError(error);

}


 


}
