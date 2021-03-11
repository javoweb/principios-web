import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-prize-assign',
  templateUrl: './prize-assign.component.html'
})
export class PrizeAssignComponent implements OnInit {

  public assignPrizeForm: FormGroup;
  @Output() SaveCancel = new EventEmitter<boolean>();
  @Input() performerId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private prizeService: PrizeService,
    private toastrService: ToastrService
  ) { }

  assignPrize(): void {
    const toBeSaved = {
      premiationDate: this.assignPrizeForm.get('date').value
    };
  }

  cancelAssignment(): void {
    this.SaveCancel.emit(false);
    this.assignPrizeForm.reset();
  }

  ngOnInit(): void {
    this.assignPrizeForm = this.formBuilder.group({
      prizeId: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

}
