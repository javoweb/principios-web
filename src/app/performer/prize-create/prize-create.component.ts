import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { PrizeService } from '../prize.service';

@Component({
  selector: 'app-prize-create',
  templateUrl: './prize-create.component.html'
})
export class PrizeCreateComponent implements OnInit {

  public createPrizeForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private prizeService: PrizeService,
    private toastrService: ToastrService
  ) { }

  createPrize(): void {

  }

  cancelCreation(): void {

  }

  ngOnInit(): void {
    this.createPrizeForm = this.formBuilder.group({
      organization: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ["", [Validators.required, Validators.maxLength(240)]]
    })
  }

}
