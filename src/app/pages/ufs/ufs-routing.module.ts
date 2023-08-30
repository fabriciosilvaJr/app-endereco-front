import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UfListComponent } from './uf-list/uf-list.component';
import { UfFormComponent } from './uf-form/uf-form.component';

const routes: Routes = [
  {path: '', component: UfListComponent},
  {path: 'new', component: UfFormComponent},
  {path: ':id/edit', component: UfFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UfsRoutingModule { }
