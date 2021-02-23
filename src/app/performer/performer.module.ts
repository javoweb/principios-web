import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformerComponent } from './performer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PerformerComponent],
  exports: [PerformerComponent]
})
export class PerformerModule { }
