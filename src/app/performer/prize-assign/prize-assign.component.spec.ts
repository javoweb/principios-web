/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrizeAssignComponent } from './prize-assign.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PrizeService } from '../prize.service';
import { of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Prize } from '../prize';

const PRIZE_OBJECT = new Prize(1, 'hj', 'sda', 'asdf', []);

describe('PrizeAssignComponent', () => {
  let component: PrizeAssignComponent;
  let fixture: ComponentFixture<PrizeAssignComponent>;
  let service: PrizeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule
      ],
      declarations: [ PrizeAssignComponent ],
      providers: [ FormBuilder, PrizeService, ToastrService, DatePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(PrizeService);
    spyOn(service, 'getPrizes').and.returnValue(of([PRIZE_OBJECT]));
    fixture = TestBed.createComponent(PrizeAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel assignment', () => {
    component = fixture.componentInstance;
    spyOn(component.SaveCancel, 'emit');
    component.cancelAssignment();
    fixture.detectChanges();
    expect(component.SaveCancel.emit).toHaveBeenCalledWith(false);
  });


  it('assign prize succesfully', () => {
    component = fixture.componentInstance;
    const spy = spyOn(service, 'assignPrize').and.returnValue(of(true));
    component.assignPrize();
    expect(spy).toHaveBeenCalled();

  });

  it('assign prize failure', () => {
    component = fixture.componentInstance;
    const spy = spyOn(service, 'assignPrize').and.returnValue(throwError({status: 404}));
    component.assignPrize();
    expect(spy).toHaveBeenCalled();


  });

  it('change prize', () => {
    component = fixture.componentInstance;
    component.changePrize({ target : {value : 1 } });
    expect(component.assignPrizeForm.get('prizeId').value).toBe(1);
  });

});
