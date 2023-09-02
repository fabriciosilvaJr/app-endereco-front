import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';
import { Pessoa } from '../pages/pessoas/pessoa.model';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   
    

    constructor(
        private authservice: AuthService,
        private router: Router
    ){

    }

   
    intercept(req: HttpRequest<any>, next: HttpHandler){
      const pessoa: any = {
        NOME: localStorage.getItem('nome'),
        CODIGO: localStorage.getItem('id'),
      }
        console.log(pessoa);
        if(localStorage.getItem('token')){
            const authReq = req.clone({
                 setHeaders:{
                     Authorization : `Bearer ${localStorage.getItem('token')}`
                 }
            });
            return next.handle(authReq)
                .pipe(catchError((error)=>{
                    console.log(error);
                    if (error instanceof HttpErrorResponse){
                        if(error.status === 401){
                            this.authservice.logout(pessoa).subscribe(
                                (pessoa) =>{
                                  //console.log(pessoa),
                                  this.actionsForSucess(pessoa)
                                },
                                (error) =>{
                                  console.log(error);
                            
                                }
                              )
                            // this.authservice.logout();
                            // this.router.navigateByUrl('/login');       
                        }
                        if(error.status === 409){
                          this.authservice.logoff();
                          this.router.navigateByUrl('/login'); 
                        }
                    }
                     return throwError(error);
                }))
        }
        return next.handle(req);
    }

    private actionsForSucess(pessoa: Pessoa){
   
  
        this.router.navigateByUrl('/login');
    
       
    
      }
}