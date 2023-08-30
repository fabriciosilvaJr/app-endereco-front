import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import toastr from 'toastr';
import { Usuario } from '../pessoa.model';


@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  pessoaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  usuario: Usuario = new Usuario();


  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {


    this.setCurrentAction();
    this.buildUsuarioForm();
    this.loadUsuario();
  
  
  }
  ngAfterContentChecked(){
    this.setPageTitle();

  }
  get CODIGO() {return this.pessoaForm.get('CODIGO')}; 
  submitForm(){
    this.submittingForm = true;
   
 
    if(this.currentAction == "new")
    {this.CODIGO.setValue(-1); 
      this.createUsuario();}

    else
      this.updateUsuario();
  }

  // Private Methods

  private setCurrentAction(){
   if(this.route.snapshot.url[0].path == "new")
      this.currentAction ="new"
   else
      this.currentAction ="edit"
  }

  private buildUsuarioForm(){
    const guid = window.localStorage.getItem('guid');
    this.pessoaForm = this.formBuilder.group({
      GUID:[guid],
      CODIGO: [null],
      COD_PERFIL_USUARIO:[null],
      NOME: [null, [Validators.required, Validators.minLength(2)]],
      EMAIL: [null,[Validators.required, Validators.email]],
      SENHA: [null,[Validators.required]],
    });
  }



  private loadUsuario(){
    if(this.currentAction == "edit"){

      this.route.paramMap.pipe(
        switchMap(params => this.usuarioService.getById(+params.get("id")))
      )
      .subscribe(
        (usuario) => {
          this.usuario = usuario;
          this.pessoaForm.patchValue(usuario) // binds loaded usuario data to UsuarioForm
        },
        (error) => alert('Ocorreu um errro no servidor, tente mais tarde.')
      )

    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle= "Novo Usuario"
    else{
      const usuarioName = this.usuario.NOME ||  ""
      this.pageTitle = "Editar Usuario";

    }
  }
 
  private createUsuario(){
    const usuario: Usuario = Object.assign(new Usuario(), this.pessoaForm.value);
 
    this.usuarioService.create(usuario)
      .subscribe(
        usuario => this.actionsForSucess(usuario),
        error => this.actionsForError(error)
      )

      
      

  }

  private updateUsuario(){
    const usuario: Usuario = Object.assign(new Usuario(), this.pessoaForm.value);
    this.usuarioService.update(usuario)
    .subscribe(
      usuario => this.actionsForSucess(usuario),
      error => this.actionsForError(error)
    )

  }

  private actionsForSucess(usuario: Usuario){
    toastr.success("Solicitação processada com sucesso!");

    // redirect / reload component page
    this.router.navigateByUrl("usuarios").then(
      ( ) => this.router.navigate(["usuarios", usuario.CODIGO, "new"])
    )
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
