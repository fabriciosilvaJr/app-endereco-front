import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipiosRoutingModule } from './municipios-routing.module';
import { MunicipioListComponent } from './municipio-list/municipio-list.component';
import { MunicipioFormComponent } from './municipio-form/municipio-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MunicipioFilterPipe } from './municipio-filter.pipe';


@NgModule({
  declarations: [MunicipioListComponent, MunicipioFormComponent, MunicipioFilterPipe],
  imports: [
    CommonModule,
    MunicipiosRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    ConfirmDialogModule
  ]
})
export class MunicipiosModule { }
