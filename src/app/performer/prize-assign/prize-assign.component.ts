import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Prize } from '../prize';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-prize-assign',
  templateUrl: './prize-assign.component.html'
})
export class PrizeAssignComponent implements OnInit {

  public assignPrizeForm: FormGroup;
  @Output() SaveCancel = new EventEmitter<boolean>();
  @Input() performerId: number | null = null;
  @Input() kind: string | null = null;
  public prizes: Prize[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private prizeService: PrizeService,
    private toastrService: ToastrService
  ) { }

  assignPrize(): void {
    const toBeSaved = {
      premiationDate: this.assignPrizeForm.get('date').value
    };
    this.prizeService.assignPrize(toBeSaved, this.performerId, this.assignPrizeForm.get('prizeId').value, this.kind).subscribe(
      (status: boolean) => {
        const message = $localize`:generalPurpose|generalPurpose@@PremioAsignadoConExito:Premio asignado exitosamente`;
        this.toastrService.success(message, $localize`:generalPurpose|generalPurpose@@Exito:Exito`, {
          closeButton: true
        });
        this.SaveCancel.emit(true);
      },
      error => {
        const message = $localize`:generalPurpose|generalPurpose@@:Error asignando premio ` + error.message;
        this.toastrService.error(message, $localize`:generalPurpose|generalPurpose@@Error:Error`, {
          closeButton: true
        });
        this.SaveCancel.emit(false);
      }
    );
    this.assignPrizeForm.reset();
  }

  cancelAssignment(): void {
    this.SaveCancel.emit(false);
    this.assignPrizeForm.reset();
  }

  ngOnInit(): void {
    this.prizeService.getPrizes().subscribe($prizes => {
      this.prizes = $prizes;
    });
    this.assignPrizeForm = this.formBuilder.group({
      prizeId: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });
  }

}
