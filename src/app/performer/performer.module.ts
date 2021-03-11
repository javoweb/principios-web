import { CommonModule, DatePipe } from '@angular/common';
import { BandDetailComponent } from './band-detail/band-detail.component';
import { MusicianDetailComponent } from './musician-detail/musician-detail.component';
import { NgModule } from '@angular/core';
import { PerformerComponent } from './performer.component';
import { PrizeAssignComponent } from './prize-assign/prize-assign.component';
import { PrizeCreateComponent } from './prize-create/prize-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  declarations: [
    PerformerComponent,
    BandDetailComponent,
    MusicianDetailComponent,
    PrizeCreateComponent,
    PrizeAssignComponent
  ],
  exports: [PerformerComponent, BandDetailComponent, MusicianDetailComponent],
  providers: [DatePipe]
})
export class PerformerModule { }
