import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformerComponent } from './performer.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PerformerComponent, BandDetailComponent, MusicianDetailComponent],
  exports: [PerformerComponent, BandDetailComponent, MusicianDetailComponent]
})
export class PerformerModule { }
