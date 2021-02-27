import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListarComponent } from './collector-listar/collector-listar.component';
import { CollectorDetalleComponent} from './collector-detalle/collector-detalle.component';
import { CollectorRoutingModule } from './collector-routing.module';

@NgModule({
  imports: [
    CommonModule, CollectorRoutingModule
  ],
  declarations: [CollectorListarComponent, CollectorDetalleComponent],
  exports: [CollectorListarComponent, CollectorDetalleComponent]
})
export class CollectorModule { }
