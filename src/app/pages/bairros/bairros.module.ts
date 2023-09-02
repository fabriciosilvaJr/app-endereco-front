import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BairrosRoutingModule } from './bairros-routing.module';
import { BairroListComponent } from './bairro-list/bairro-list.component';
import { BairroFormComponent } from './bairro-form/bairro-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BairroFilterPipe } from './bairro-filter.pipe';


@NgModule({
  declarations: [BairroListComponent, BairroFormComponent, BairroFilterPipe],
  imports: [
    CommonModule,
    BairrosRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    ConfirmDialogModule
  ]
})
export class BairrosModule { }
