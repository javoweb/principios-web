import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-prize-create',
  templateUrl: './prize-create.component.html'
})
export class PrizeCreateComponent implements OnInit {

  public createPrizeForm: FormGroup;
  @Output() SaveCancel = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private prizeService: PrizeService,
    private toastrService: ToastrService
  ) { }

  createPrize(): void {
    const toBeSaved = {
      description: this.createPrizeForm.get('description').value,
      name: this.createPrizeForm.get('name').value,
      organization: this.createPrizeForm.get('organization').value
    };

    this.prizeService.createPrize(toBeSaved).subscribe(
      (status: boolean) => {
        const message = $localize`:generalPurpose|generalPurpose@@PremioCreadoConExito:Premio creado exitosamente`;
        this.toastrService.success(message, $localize`:generalPurpose|generalPurpose@@Exito:Exito`, {
          closeButton: true
        });
        this.SaveCancel.emit(true);
      },
      error => {
        const message = $localize`:generalPurpose|generalPurpose@@:Error creando premio ` + error.message;
        this.toastrService.error(message, $localize`:generalPurpose|generalPurpose@@Error:Error`, {
          closeButton: true
        });
        this.SaveCancel.emit(false);
      }
    );
  }

  cancelCreation(): void {
    this.SaveCancel.emit(false);
  }

  ngOnInit(): void {
    this.createPrizeForm = this.formBuilder.group({
      organization: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(240)]]
    });
  }

}
