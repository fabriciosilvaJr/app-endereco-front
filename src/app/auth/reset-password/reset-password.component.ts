import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/pages/pessoas/pessoa.model';
import toastr from 'toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  token: any;
  email: any;

  public usuario: Usuario = new Usuario();

  


  ResetForm: FormGroup = this.fb.group({
    EMAIL: ['',[Validators.required, Validators.email]],
    SENHA: ['',[Validators.required]],
    confirmarSenha: ['',[Validators.required]],
    token: ['',[Validators.required]],
  
  },{ validator: this.checkPasswords })

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.SENHA.value;
  let confirmPass = group.controls.confirmarSenha.value;

  return pass === confirmPass ? null : { notSame: true }
}
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,

    ) { }
  

  ngOnInit(): void {
    
    console.log(this.router.parseUrl(this.router.url).root.children.primary.segments)
    this.token = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;
    this.email = this.router.parseUrl(this.router.url).root.children.primary.segments[2].path;
    this.ResetForm.get('token').setValue(this.token);
    this.ResetForm.get('EMAIL').setValue(this.email);

 
  }


  onSubmit(){
    this.submittingForm = true;

  
    const usuario: Usuario = Object.assign(new Usuario(), this.ResetForm.value);
    this.authservice.reset(usuario)
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

    if((error.status === 400) || (error.status === 401))
      toastr.error("Não foi possível recuperar a senha, tente gerar um novo link");
    else
       toastr.error("Falha na comunicação com o servidor. Por favor, tente mais tarde");

  }

}
