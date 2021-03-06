import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumListarComponent } from './album-listar/album-listar.component';
import { AlbumDetalleComponent } from './album-detalle/album-detalle.component';
import { AlbumComentariosComponent } from './album-comentarios/album-comentarios.component';
import { AlbumTracksComponent } from './album-tracks/album-tracks.component';
import { AlbumTranslationsComponent } from './album-translations/album-translations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AlbumListarComponent,
    AlbumDetalleComponent,
    AlbumComentariosComponent,
    AlbumTracksComponent,
    AlbumTranslationsComponent
  ],
  exports: [AlbumListarComponent, AlbumDetalleComponent]
})
export class AlbumModule {}
