import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UfsRoutingModule } from './ufs-routing.module';
import { UfListComponent } from './uf-list/uf-list.component';
import { UfFormComponent } from './uf-form/uf-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UFFilterPipe } from './uf-filter.pipe';


@NgModule({
  declarations: [UfListComponent, UfFormComponent, UFFilterPipe],
  imports: [
    CommonModule,
    UfsRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    ConfirmDialogModule
    
  ]
})
export class UfsModule { }
