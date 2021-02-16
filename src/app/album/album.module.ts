import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlbumListarComponent} from './album-listar/album-listar.component';
import {AlbumDetalleComponent} from './album-detalle/album-detalle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlbumListarComponent, AlbumDetalleComponent],
  exports: [AlbumListarComponent, AlbumDetalleComponent]
})
export class AlbumModule { }
