import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformerComponent } from './performer.component';
import { BandDetailComponent } from './band-detail/band-detail.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PerformerComponent, BandDetailComponent],
  exports: [PerformerComponent, BandDetailComponent]
})
export class PerformerModule { }
