import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformerComponent } from './performer.component';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';
import { PrizeCreateComponent } from './prize-create/prize-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [PerformerComponent, BandDetailComponent, MusicianDetailComponent, PrizeCreateComponent],
  exports: [PerformerComponent, BandDetailComponent, MusicianDetailComponent, PrizeCreateComponent]
})
export class PerformerModule { }
