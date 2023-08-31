import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MunicipioListComponent } from './municipio-list/municipio-list.component';
import { MunicipioFormComponent } from './municipio-form/municipio-form.component';

const routes: Routes = [
  {path: '', component: MunicipioListComponent},
  {path: 'new', component: MunicipioFormComponent},
  {path: ':id/edit', component: MunicipioFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipiosRoutingModule { }
