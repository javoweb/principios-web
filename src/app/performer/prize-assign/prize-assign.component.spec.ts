/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrizeAssignComponent } from './prize-assign.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PrizeService } from '../prize.service';
import { of, throwError } from 'rxjs';

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
        ToastrModule.forRoot()
      ],
      declarations: [ PrizeAssignComponent ],
      providers: [ FormBuilder, PrizeService, ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(PrizeService);
    fixture = TestBed.createComponent(PrizeAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel assignment', () => {

    // spy on event emitter
    component = fixture.componentInstance;
    spyOn(component.SaveCancel, 'emit');
    component.cancelAssignment();
    fixture.detectChanges();
    expect(component.SaveCancel.emit).toHaveBeenCalledWith(false);
  });


  it('assign prize succesfully', () => {

    // spy on event emitter
    component = fixture.componentInstance;

    const spy = spyOn(service, 'assignPrize').and.returnValue(of(true));
    component.assignPrize();
    expect(spy).toHaveBeenCalled();

  });

  it('assign prize failure', () => {

    // spy on event emitter
    component = fixture.componentInstance;

    const spy = spyOn(service, 'assignPrize').and.returnValue(throwError({status: 404}));
    component.assignPrize();
    expect(spy).toHaveBeenCalled();


  });
});
