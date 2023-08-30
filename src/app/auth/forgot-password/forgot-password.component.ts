import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/pages/pessoas/pessoa.model';
import toastr from 'toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  public usuario: Usuario = new Usuario();


  ForgotForm: FormGroup = this.fb.group({
    EMAIL: ['',[Validators.required, Validators.email]],
  
  })
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,

    ) { }
  

  ngOnInit(): void {
    this.ForgotForm.get('EMAIL').valueChanges.subscribe(event => {
      this.ForgotForm.get('EMAIL').setValue(event.toLowerCase(), {emitEvent: false});
 
   });
  }


  onSubmit(){
    this.submittingForm = true;

  
    const usuario: Usuario = Object.assign(new Usuario(), this.ForgotForm.value);
    this.authservice.forgot(usuario)
    .subscribe(
      usuario => this.actionsForSucess(usuario),
      error => this.actionsForError(error)
    )
  }

  
  private actionsForSucess(usuario: Usuario){
    toastr.success("Solicitação realizada com sucesso!");
   
    setTimeout(() => {
      this.router.navigateByUrl("/")
    }
    , 1000);

  }

  private actionsForError(error){

    this.submittingForm = false;

    if(error.status === 401)
      toastr.error("Usuário invalido");

      else if(error.status === 400)
        toastr.error("Erro ao enviar o email");
    else
       toastr.error("Falha na comunicação com o servidor. Por favor, tente mais tarde");

    

  }


}
