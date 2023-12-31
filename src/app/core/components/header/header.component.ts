import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pessoa } from 'src/app/pages/pessoas/pessoa.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticated$: Observable<boolean> ;
  user$: Observable<Pessoa>;
  usuario: any = {
    NOME: localStorage.getItem('nome'),
    CODIGO: localStorage.getItem('id'),
  }



  constructor(
    private authservice: AuthService,
    private router: Router) {
    this.authenticated$ = this.authservice.isAuthenticated();
    this.user$ = this.authservice.getUser();
    //this.usuario = window.localStorage.getItem('nome')
  }



 

  ngOnInit(): void {


    
  }
  

  logout(){
    // const user = this.usuario
    this.authservice.logoff();

    // this.authservice.logout();
    this.router.navigateByUrl('/login');
  }


  private actionsForSucess(pessoa: Pessoa){
   
  
    this.router.navigateByUrl('/login');

   

  }

  // private actionsForError(error){
  //   toastr.error("Usuário ou senha invalida");

  //   this.submittingForm = false;

  //   if(error.status === 422)
  //     this.serverErrorMessages = JSON.parse(error._body).errrors;
  //   else
  //     this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde"]

    

  // }

}
