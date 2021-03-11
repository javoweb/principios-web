import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private toastrService: ToastrService,
    private datePipe: DatePipe
  ) { }

  assignPrize(): void {
    const dateArr = this.assignPrizeForm.get('date').value.split('/');
    const dateStr = dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
    const date = new Date(dateStr);
    const toBeSaved = {
      id: this.assignPrizeForm.get('prizeId').value,
      premiationDate: date
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
        const message = $localize`:generalPurpose|generalPurpose@@ErrorAsignandoPremio:Error asignando premio ` + error.message;
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

  changePrize(event): void {
    this.assignPrizeForm.get('prizeId').setValue(event.target.value, {
      onlySelf: true
    });
    console.log(event.target.value);
  }

  ngOnInit(): void {
    this.prizeService.getPrizes().subscribe($prizes => {
      this.prizes = $prizes;
      console.log(this.prizes);
    });
    this.assignPrizeForm = this.formBuilder.group({
      prizeId: [null , [Validators.required, Validators.min(0)]],
      date: new FormControl(this.datePipe.transform(new Date(), 'dd/MM/yyyy'), [Validators.required, Validators.pattern(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/)])
    });
  }

}
