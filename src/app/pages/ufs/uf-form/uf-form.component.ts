import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UF } from '../uf.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UfService } from 'src/app/core/services/uf.service';
import toastr from 'toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-uf-form',
  templateUrl: './uf-form.component.html',
  styleUrls: ['./uf-form.component.css']
})
export class UfFormComponent implements OnInit, AfterContentChecked {
  currentAction: string;
  ufForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  uf: UF = new UF();

  constructor(
    private ufService: UfService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildUfForm();
    this.loadUf();
  }
  ngAfterContentChecked(){
    this.setPageTitle();
    if(this.currentAction =="new"){
      this.ufForm.removeControl('codigoUF');

    }

  }
  get codigoUF() {return this.ufForm.get('codigoUF')}; 
  submitForm(){
    this.submittingForm = true;
   
 
    if(this.currentAction == "new")
      this.createUf();

    else
      this.updateUf();
  }

  get ufGroup() { return this.ufForm.get('codigoUF'); }


  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
  
        this.currentAction ="new";

      
    else
       this.currentAction ="edit";

    
   }
 
   private buildUfForm(){
    this.ufForm = this.formBuilder.group({
      codigoUF: [null,[Validators.required]],
      nome: [null,[Validators.required]],
      sigla: [null, [Validators.required, Validators.minLength(2)]],
      status: [1,[Validators.required]],
    });
     
   }
 
 
 
   private loadUf(){
     if(this.currentAction == "edit"){
 
       this.route.paramMap.pipe(
         switchMap(params => this.ufService.getById(+params.get("id")))
       )
       .subscribe(
         (uf) => {
           this.uf = uf;
           this.ufForm.patchValue(uf) // binds loaded uf data to UfForm
         },
         (error) => alert('Ocorreu um errro no servidor, tente mais tarde.')
       )
 
     }
   }
 
   private setPageTitle(){
     if(this.currentAction == 'new')
       this.pageTitle= "Nova UF"
     else{
       const ufName = this.uf.nome ||  ""
       this.pageTitle = "Editar UF";
 
     }
   }
  
   private createUf(){
     const uf: UF = Object.assign(new UF(), this.ufForm.value);
  
     this.ufService.create(uf)
       .subscribe(
         uf => this.actionsForSucess(uf),
         error => this.actionsForError(error)
       )
 
      
   }
 
   private updateUf(){
     const uf: UF = Object.assign(new UF(), this.ufForm.value);
     this.ufService.update(uf)
     .subscribe(
       uf => this.actionsForSucess(uf),
       error => this.actionsForError(error)
     )
 
   }
 



  private actionsForSucess(uf: UF){
    toastr.success("Solicitação processada com sucesso!");

    // redirect / reload component page
    this.router.navigateByUrl("uf").then(
      ( ) => this.router.navigate(["uf", uf.codigoUF, "new"])
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
