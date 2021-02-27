import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollectorListarComponent} from '../collector/collector-listar/collector-listar.component';
import {CollectorDetalleComponent} from '../collector/collector-detalle/collector-detalle.component';

const routes: Routes = [
  {
    path: 'collectors',
    children: [
    {
      path: 'list',
      component: CollectorListarComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CollectorRoutingModule { }


