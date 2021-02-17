import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistaComponent } from './artista.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ArtistaComponent],
  exports: [ArtistaComponent]
})
export class ArtistaModule { }
