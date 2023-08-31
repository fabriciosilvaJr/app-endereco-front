import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BairroListComponent } from './bairro-list/bairro-list.component';
import { BairroFormComponent } from './bairro-form/bairro-form.component';

const routes: Routes = [
  {path: '', component: BairroListComponent},
  {path: 'new', component: BairroFormComponent},
  {path: ':id/edit', component: BairroFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BairrosRoutingModule { }
