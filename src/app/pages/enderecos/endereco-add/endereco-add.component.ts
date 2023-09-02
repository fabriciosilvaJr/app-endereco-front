import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Endereco } from '../endereco.model';
import toastr from 'toastr';
import { EnderecoService } from 'src/app/core/services/endereco.service';
import { BairroService } from 'src/app/core/services/bairro.service';
import { Bairro } from '../../bairros/bairro.model';

@Component({
  selector: 'app-endereco-add',
  templateUrl: './endereco-add.component.html',
  styleUrls: ['./endereco-add.component.css']
})
export class EnderecoAddComponent implements OnInit {
  addForm: FormGroup;
  selectedUser: Endereco;
  submittingForm: boolean = false;
  bairros: Array<Bairro>;
  codigoPessoa: any;
  path: any
  


  constructor(
    public modal: NgbActiveModal,
    private enderecoService: EnderecoService,
    private bairroService: BairroService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,

     ) { }

  ngOnInit(): void {
   this.path =  this.router.parseUrl(this.router.url).root.children.primary.segments[1].path;
    this.buildForm();
   this.bairroService.getAll().subscribe(
      bairros =>  this.bairros = bairros,
       error => alert ("Erro ao carregar a lista"),

     )

  }
  ngAfterContentChecked(){
    if(this.path =="new"){
      this.addForm.removeControl('codigoPessoa');

    }


  }
  onSubmit() {
   
    this.submittingForm = true;
    this.enderecoService.setEnderecoData(this.addForm.value);
    this.addForm.reset();
    this.modal.close('Yes');
    
   
   
  }


  private buildForm() {
    this.codigoPessoa = this.router.parseUrl(this.router.url).root.children.primary.segments[1].path

    this.addForm = this.formBuilder.group({
      codigoPessoa:[this.codigoPessoa],
      codigoBairro:[null,[Validators.required]],
      nomeRua: [null, [Validators.required]],
      numero: [null, Validators.required],
      complemento: [ null, Validators.required],
      cep: [null, Validators.required]

    });
  }

  


}
