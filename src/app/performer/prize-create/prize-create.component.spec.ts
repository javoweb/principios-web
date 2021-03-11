/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { PrizeService } from '../prize.service';

import { PrizeCreateComponent } from './prize-create.component';

describe('PrizeCreateComponent', () => {
  let component: PrizeCreateComponent;
  let fixture: ComponentFixture<PrizeCreateComponent>;
  let service: PrizeService;

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
    service = TestBed.inject(PrizeService);
    fixture = TestBed.createComponent(PrizeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel creation', () => {

    // spy on event emitter
    component = fixture.componentInstance;
    spyOn(component.SaveCancel, 'emit');
    component.cancelCreation();
    fixture.detectChanges();
    expect(component.SaveCancel.emit).toHaveBeenCalledWith(false);
  });


  it('create prize succesfully', () => {

    // spy on event emitter
    component = fixture.componentInstance;

    const spy = spyOn(service, 'createPrize').and.returnValue(of(true));
    component.createPrize();
    expect(spy).toHaveBeenCalled();

  });

  it('create prize failure', () => {

    // spy on event emitter
    component = fixture.componentInstance;

    const spy = spyOn(service, 'createPrize').and.returnValue(throwError({status: 404}));
    component.createPrize();
    expect(spy).toHaveBeenCalled();


  });

});
