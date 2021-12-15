import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutomovelComponent } from './automovel/automovel.component';
import { ClienteComponent } from './cliente/cliente.component';
import { LocacaoComponent } from './locacao/locacao.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteComponent },
  { path: 'automoveis', component: AutomovelComponent },
  { path: 'locacao', component: LocacaoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
