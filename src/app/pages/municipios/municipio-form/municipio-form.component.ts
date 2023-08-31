import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';
import { Municipio } from '../municipio.model';
import { MunicipioService } from 'src/app/core/services/municipio.service';
import { UfService } from 'src/app/core/services/uf.service';
import { UF } from '../../ufs/uf.model';

@Component({
  selector: 'app-municipio-form',
  templateUrl: './municipio-form.component.html',
  styleUrls: ['./municipio-form.component.css']
})
export class MunicipioFormComponent implements OnInit {
  currentAction: string;
  municipioForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  municipio: Municipio = new Municipio();
  ufs: Array<UF>;

  constructor(
    private municipioService: MunicipioService,
    private ufService: UfService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildMunicipioForm();
    this.ufService.getAll().subscribe(
      ufs =>  this.ufs = ufs,
       error => alert ("Erro ao carregar a lista"),

     )
    this.loadMunicipio();

   
  }

  ngAfterContentChecked(){
    this.setPageTitle();
    if(this.currentAction =="new"){
      this.municipioForm.removeControl('codigoMunicipio');

    }


  }
  get codigoMunicipio() {return this.municipioForm.get('codigoMunicipio')}; 
  submitForm(){
    this.submittingForm = true;
   
 
    if(this.currentAction == "new")
      this.createMunicipio();

    else
      this.updateMunicipio();
  }



  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
  
        this.currentAction ="new";

      
    else
       this.currentAction ="edit";

    
   }
 
   private buildMunicipioForm(){
    this.municipioForm = this.formBuilder.group({
      codigoMunicipio: [null,[Validators.required]],
      codigoUF: [null,[Validators.required]],
      nome: [null,[Validators.required]],
      status: [null,[Validators.required]],
    });
     
   }
 
 
 
   private loadMunicipio(){
     if(this.currentAction == "edit"){
 
       this.route.paramMap.pipe(
         switchMap(params => this.municipioService.getById(+params.get("id")))
       )
       .subscribe(
         (municipio) => {
           this.municipio = municipio;
           this.municipioForm.patchValue(municipio) // binds loaded municipio data to UfForm
         },
         (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
       )
 
     }
   }
 
   private setPageTitle(){
     if(this.currentAction == 'new')
       this.pageTitle= "Novo Municipio"
     else{
       const municipioName = this.municipio.nome ||  ""
       this.pageTitle = "Editar Municipio";
 
     }
   }
  
   private createMunicipio(){
     const municipio: Municipio = Object.assign(new Municipio(), this.municipioForm.value);
  
     this.municipioService.create(municipio)
       .subscribe(
         municipio => this.actionsForSucess(municipio),
         error => this.actionsForError(error)
       )
 
      
   }
 
   private updateMunicipio(){
     const municipio: Municipio = Object.assign(new Municipio(), this.municipioForm.value);
     this.municipioService.update(municipio)
     .subscribe(
       municipio => this.actionsForSucess(municipio),
       error => this.actionsForError(error)
     )
 
   }
 



  private actionsForSucess(municipio: Municipio){
    toastr.success("Solicitação processada com sucesso!");

    // redirect / reload component page
    this.router.navigateByUrl("municipios").then(
      ( ) => this.router.navigate(["municipios", municipio.codigoMunicipio, "new"])
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
