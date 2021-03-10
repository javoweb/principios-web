/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PrizeService } from '../prize.service';

import { PrizeCreateComponent } from './prize-create.component';

describe('PrizeCreateComponent', () => {
  let component: PrizeCreateComponent;
  let fixture: ComponentFixture<PrizeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ PrizeCreateComponent ],
      providers: [ FormBuilder, PrizeService, ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
