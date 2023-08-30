import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Usuario } from 'src/app/pages/pessoas/pessoa.model';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  GUID = window.localStorage.getItem('guid');
  ID = window.localStorage.getItem('id');

  private api: string = (environment.api + "pessoa" ) 
 

  private subjUsuario$: BehaviorSubject<Usuario> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<Boolean> = new BehaviorSubject(false);


  constructor(private http: HttpClient, private router: Router) { }

  

  register(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${this.api}/cadastro`,usuario).pipe(
      catchError(this.handleError)

    )
    
  }


 login(credentials: {login: string, senha: string}): Observable<Usuario>{
   return this.http.post<Usuario>(`${this.api}/login`, credentials)
  //  return this.http.post( this.api + 'auth',credentials)
   .pipe(
     tap((u:any)=>{
        localStorage.setItem('token',u.token);
        localStorage.setItem('id',u.data.id.toString());
        // localStorage.setItem('role',u.COD_PERFIL_USUARIO.toString());
         localStorage.setItem('nome',u.data.name.toString());
        localStorage.setItem('guid',u.GUID);
        this.subjLoggedIn$.next(true);
        this.subjUsuario$.next(u);
        //console.log(u);
     })
   )
 }

 forgot(usuario: Usuario){
  const url = `${this.api}/forgot-password`;
  return this.http.put(url, usuario).pipe(
    map(() => usuario),
    catchError(this.handleError)
  )
} 
reset(usuario: Usuario){
  const url = `${this.api}/reset-password`;
  return this.http.put(url, usuario).pipe(
    map(() => usuario),
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
    .get<Usuario>(`${this.api}`)
    .pipe(
      tap((u: Usuario) => {
        if (u) {
          this.subjLoggedIn$.next(true);
          this.subjUsuario$.next(u);
        }
      }),
      map((u: Usuario) => (u)?true:false),
      catchError((err) => {
        // this.logout();
        return of(false);
      })
    );
}
 getUser():Observable<Usuario>{

  return this.subjUsuario$.asObservable();

 }
 
 logout(user:any): Observable<Usuario>{
  return this.http.post<Usuario>(`${this.api}/logout`, user)
 //  return this.http.post( this.api + 'auth',credentials)
  .pipe(
    tap(()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('nome');
      localStorage.removeItem('id');
       window.location.reload();
      this.subjLoggedIn$.next(false);
      this.subjUsuario$.next(null);
       //console.log(u);
    })
  )
}

 logoff(){

   localStorage.removeItem('token');
   localStorage.removeItem('nome');
   localStorage.removeItem('id');
   localStorage.removeItem('role');
   localStorage.removeItem('guid');
   this.subjLoggedIn$.next(false);
   this.subjUsuario$.next(null);

 }

 private handleError(error: any):Observable<any>{
  console.log("Erro na requisição =>", error);
  return throwError(error);

}


 


}
