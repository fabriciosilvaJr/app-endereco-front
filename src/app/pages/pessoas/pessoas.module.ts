import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { OrderModule } from 'ngx-order-pipe'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Importação
import { PessoaFilterPipe } from './pessoa-filter.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { EnderecoAddComponent } from '../enderecos/endereco-add/endereco-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [PessoaListComponent, PessoaFormComponent, PessoaFilterPipe, EnderecoAddComponent],
  imports: [
    CommonModule,
    PessoasRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    ConfirmDialogModule,
    MessagesModule,
    NgbModule
  ]
})
export class PessoasModule { }
