import { CommonModule } from '@angular/common';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';
import { NgModule } from '@angular/core';
import { PerformerComponent } from './performer.component';
import { PrizeAssignComponent } from './prize-assign/prize-assign.component';
import { PrizeCreateComponent } from './prize-create/prize-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  declarations: [PerformerComponent, BandDetailComponent, MusicianDetailComponent, PrizeCreateComponent, PrizeAssignComponent],
  exports: [PerformerComponent, BandDetailComponent, MusicianDetailComponent, PrizeCreateComponent, PrizeAssignComponent]
})
export class PerformerModule { }
