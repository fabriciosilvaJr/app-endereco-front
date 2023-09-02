import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import toastr from 'toastr';
import { map } from 'rxjs/operators';
import { Pessoa } from 'src/app/pages/pessoas/pessoa.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  currentAction: string;
  formRegister: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  usuario: Pessoa = new Pessoa();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.buildPessoaForm();
    //this.verificaEmailService.verificarEmail('fabricio.inttegre@gmail.com').subscribe();

  }

  submitForm(){
    this.submittingForm = true;
    this.createPessoa();

  }

  


  private buildPessoaForm(){
    this.formRegister = this.formBuilder.group({
      GUID:[null],
      CODIGO: [null],
      COD_PERFIL_USUARIO:[1],
      NOME: [null, [Validators.required, Validators.minLength(2)]],
      EMAIL: [null,[Validators.required, Validators.email]],
      SENHA: [null,[Validators.required,  Validators.minLength(6)]],
      confirmarSenha: ['',[Validators.required]],
    },{ validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.SENHA.value;
    let confirmPass = group.controls.confirmarSenha.value;
  
    return pass === confirmPass ? null : { notSame: true }
  }

   
  private createPessoa(){
    const usuario: Pessoa = Object.assign(new Pessoa(), this.formRegister.value);
 
    this.authService.register(usuario)
      .subscribe(
        usuario => this.actionsForSucess(usuario),
        error => this.actionsForError(error)
      )


      
      
      

  }

  private actionsForSucess(usuario: Pessoa){
    toastr.success("Usuário cadastrado com sucesso!");

    setTimeout(() => {
      this.router.navigateByUrl("login");
    }
    , 1000);
   
   
  }

  private actionsForError(error){
    

    this.submittingForm = false;

    if(error.status === 409){  
        toastr.error("Usuário já cadastrado");
      
    }
      else if(error.status === 500){
        toastr.error("Ocorreu um erro ao processar sua solicitação!");
        

      }
    else
      toastr.error("Falha na comunicação com o servidor. Por favor, tente mais tarde");

    

  }



}
