import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollectorListarComponent} from '../collector/collector-listar/collector-listar.component';

const routes: Routes = [
  { path: 'collectors', component: CollectorListarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CollectorRoutingModule { }


