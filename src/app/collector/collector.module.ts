import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListarComponent } from './collector-listar/collector-listar.component';
import { CollectorDetalleComponent} from './collector-detalle/collector-detalle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CollectorListarComponent, CollectorDetalleComponent],
  exports: [CollectorListarComponent, CollectorDetalleComponent]
})
export class CollectorModule { }
