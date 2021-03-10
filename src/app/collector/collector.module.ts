import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectorListarComponent } from './collector-listar/collector-listar.component';
import { CollectorDetalleComponent} from './collector-detalle/collector-detalle.component';
import { CollectorFavoritePerformersComponent} from './collector-favoritePerformers/collector-favoritePerformers.component';
import { CollectorAlbumComponent} from './collector-album/collector-album.component';
import { CollectorRoutingModule } from './collector-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, CollectorRoutingModule, FormsModule, ReactiveFormsModule
  ],
  declarations: [CollectorListarComponent, CollectorDetalleComponent, CollectorFavoritePerformersComponent, CollectorAlbumComponent],
  exports: [CollectorListarComponent, CollectorDetalleComponent]
})
export class CollectorModule { }
