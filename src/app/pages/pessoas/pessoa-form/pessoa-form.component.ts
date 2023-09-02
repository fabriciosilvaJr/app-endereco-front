import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PessoaService } from 'src/app/core/services/pessoa.service';
import toastr from 'toastr';
import { Pessoa } from '../pessoa.model';
import { ConfirmationService } from 'primeng/api';
import {Message} from 'primeng/api';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoAddComponent } from '../../enderecos/endereco-add/endereco-add.component';
import { EnderecoService } from 'src/app/core/services/endereco.service';
import { Endereco } from '../../enderecos/endereco.model';



@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
  providers: [ConfirmationService]

})
export class PessoaFormComponent implements OnInit, AfterContentChecked {
  searchTerm:string;
  public paginaAtual = 1;
  pageSize = 5;
  enderecos: Endereco[] = [];
  position: string;
  msgs: Message[] = [];

  key:string = 'CODIGO'; // Define um valor padrão, para quando inicializar o componente
    reverse: boolean = false;
  tamanho: any;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

  currentAction: string;
  pessoaForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  pessoa: Pessoa = new Pessoa();


  constructor(
    private pessoaService: PessoaService,
    private modalService: NgbModal,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.clearEnderecoCache();
    this.setCurrentAction();
    this.buildPessoaForm();
    this.loadPessoa();
    this.enderecoService.getEnderecoData().subscribe((enderecoData) => {
      if (enderecoData) {
        this.enderecos.push(enderecoData);
        this.addEnderecoToForm(enderecoData);
      }
    });

  
  
  }
  addEnderecoToForm(enderecoData: Endereco) {
    const enderecoArray = this.pessoaForm.get('enderecos') as FormArray;
    enderecoArray.push(this.formBuilder.group(enderecoData));

  }
  clearEnderecoCache() {
    this.enderecoService.clearEnderecoData();
    this.enderecos = [];
  }
  
  ngAfterContentChecked(){
    this.setPageTitle();
    if(this.currentAction =="new"){
      this.pessoaForm.removeControl('codigoPessoa');

    }
  

  }

  addEndereco() {
    // this.router.navigateByUrl(`EditUser/${userModel.id}`);

    const ref = this.modalService.open(EnderecoAddComponent, { centered: true, size: 'lg', backdrop: 'static' });
    

    ref.result.then((yes) => {
      console.log("Yes Click");

      //this.setNaturezaList();
    },
      (cancel) => {
        console.log("Cancel Click");
        this.pessoaForm.reset();
        this.clearEnderecoCache();

      })
  }



  
  get codigoPessoa() {return this.pessoaForm.get('codigoPessoa')}; 
  submitForm(){
    this.submittingForm = true;
   
 
    if(this.currentAction == "new")
    {
      this.createPessoa();
      this.pessoaForm.reset();
      this.clearEnderecoCache();


    }

    else{
      this.updatePessoa();
      this.pessoaForm.reset();
      this.clearEnderecoCache();

    }
  }

  // Private Methods

  private setCurrentAction(){
   if(this.route.snapshot.url[0].path == "new")
      this.currentAction ="new"
   else
      this.currentAction ="edit"
  }

  private buildPessoaForm(){
    const guid = window.localStorage.getItem('guid');
    this.pessoaForm = this.formBuilder.group({
      codigoPessoa: [null],
      nome: [null, [Validators.required]],
      sobrenome: [null,[Validators.required]],
      idade: [null,[Validators.required]],
      login: [null,[Validators.required]],
      senha: [null,[Validators.required]],
      status: [1,[Validators.required]],
      enderecos: this.formBuilder.array([])


    });
  }



  private loadPessoa(){
    if(this.currentAction == "edit"){

      this.route.paramMap.pipe(
        switchMap(params => this.pessoaService.getById(+params.get("id")))
      )
      .subscribe(
        (pessoa: any) => {
          this.pessoa = pessoa;
          this.pessoaForm.patchValue(pessoa) // binds loaded pessoa data to PessoaForm
          const enderecos = pessoa.enderecos.map((endereco) => ({
            codigoEndereco: endereco.codigoEndereco,
            codigoPessoa: endereco.codigoPessoa,
            codigoBairro: endereco.codigoBairro,
            nomeRua: endereco.nomeRua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            cep: endereco.cep,
          }));
           if(enderecos.length > 0){
            for (let i = 0; i < enderecos.length; i++) {
              this.addEnderecoToForm(enderecos[i]);
              this.enderecos.push(enderecos[i]);
              
            }
            
           }
        

        },
        (error) => alert('Ocorreu um errro no servidor, tente mais tarde.')
      )

    }
  }

  private setPageTitle(){
    if(this.currentAction == 'new')
      this.pageTitle= "Nova Pessoa"
    else{
      const pessoaName = this.pessoa.nome ||  ""
      this.pageTitle = "Editar Pessoa";

    }
  }
 
  private createPessoa(){
    const pessoa: Pessoa = Object.assign(new Pessoa(), this.pessoaForm.value);
 
    this.pessoaService.create(pessoa)
      .subscribe(
        pessoa => this.actionsForSucess(pessoa),
        error => this.actionsForError(error)
      )

      
      

  }

  private updatePessoa(){
    const pessoa: Pessoa = Object.assign(new Pessoa(), this.pessoaForm.value);
    this.pessoaService.update(pessoa)
    .subscribe(
      pessoa => this.actionsForSucess(pessoa),
      error => this.actionsForError(error)
    )

  }

  private actionsForSucess(pessoa: Pessoa){
    toastr.success("Solicitação processada com sucesso!");

    // redirect / reload component page
    this.router.navigateByUrl("pessoas").then(
      ( ) => this.router.navigate(["pessoas", pessoa.codigoPessoa, "new"])
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
