import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';
import { Bairro } from '../bairro.model';
import { BairroService } from 'src/app/core/services/bairro.service';
import { Municipio } from '../../municipios/municipio.model';
import { MunicipioService } from 'src/app/core/services/municipio.service';
@Component({
  selector: 'app-bairro-form',
  templateUrl: './bairro-form.component.html',
  styleUrls: ['./bairro-form.component.css']
})
export class BairroFormComponent implements OnInit {
  currentAction: string;
  bairroForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  bairro: Bairro = new Bairro();
  municipios: Array<Municipio>;


  constructor(
    private bairroService: BairroService,
    private municipioService: MunicipioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildBairroForm();
    this.municipioService.getAll().subscribe(
      municipios =>  this.municipios = municipios,
       error => alert ("Erro ao carregar a lista"),

     )
    this.loadBairro();
  }


  ngAfterContentChecked(){
    this.setPageTitle();
    if(this.currentAction =="new"){
      this.bairroForm.removeControl('codigoBairro');

    }


  }
  get codigoBairro() {return this.bairroForm.get('codigoBairro')}; 
  submitForm(){
    this.submittingForm = true;
   
 
    if(this.currentAction == "new")
      this.createBairro();

    else
      this.updateBairro();
  }



  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
  
        this.currentAction ="new";

      
    else
       this.currentAction ="edit";

    
   }
 
   private buildBairroForm(){
    this.bairroForm = this.formBuilder.group({
      codigoBairro: [null,[Validators.required]],
      codigoMunicipio: [null,[Validators.required]],
      nome: [null,[Validators.required]],
      status: [null,[Validators.required]],
    });
     
   }
 
 
 
   private loadBairro(){
     if(this.currentAction == "edit"){
 
       this.route.paramMap.pipe(
         switchMap(params => this.bairroService.getById(+params.get("id")))
       )
       .subscribe(
         (bairro) => {
           this.bairro = bairro;
           this.bairroForm.patchValue(bairro) // binds loaded bairro data to UfForm
         },
         (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
       )
 
     }
   }
 
   private setPageTitle(){
     if(this.currentAction == 'new')
       this.pageTitle= "Novo Bairro"
     else{
       const bairroName = this.bairro.nome ||  ""
       this.pageTitle = "Editar Bairro";
 
     }
   }
  
   private createBairro(){
     const bairro: Bairro = Object.assign(new Bairro(), this.bairroForm.value);
  
     this.bairroService.create(bairro)
       .subscribe(
         bairro => this.actionsForSucess(bairro),
         error => this.actionsForError(error)
       )
 
      
   }
 
   private updateBairro(){
     const bairro: Bairro = Object.assign(new Bairro(), this.bairroForm.value);
     this.bairroService.update(bairro)
     .subscribe(
       bairro => this.actionsForSucess(bairro),
       error => this.actionsForError(error)
     )
 
   }
 



  private actionsForSucess(bairro: Bairro){
    toastr.success("Solicitação processada com sucesso!");

    // redirect / reload component page
    this.router.navigateByUrl("bairros").then(
      ( ) => this.router.navigate(["bairros", bairro.codigoBairro, "new"])
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
