/* tslint:disable:no-unused-variable */
import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorFavoritePerformersComponent } from './collector-favoritePerformers.component';
import { CollectorService } from 'src/app/collector/collector.service';
import { BandService } from 'src/app/performer/band.service';
import { HttpClientModule } from '@angular/common/http';
import { Collector } from 'src/app/collector/collector';
import { Band } from 'src/app/performer/band';
import { Observable, of, throwError } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import faker from 'faker';

const BAND_OBJECT = new Band(
  faker.random.number(),
  faker.name.findName(),
  faker.internet.url(),
  faker.lorem.sentence(),
  faker.date.past(),
  []
);
const BANDS_ARRAY: Band[] = [];
BANDS_ARRAY.push(BAND_OBJECT);

describe('CollectorFavoritePerformersComponent', () => {
  let component: CollectorFavoritePerformersComponent;
  let fixture: ComponentFixture<CollectorFavoritePerformersComponent>;
  let bandService: BandService;
  let collectorService: CollectorService;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ CollectorFavoritePerformersComponent ],
      providers: [CollectorService, BandService, ToastrService, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorFavoritePerformersComponent);
    collectorService = TestBed.inject(CollectorService);
    bandService = TestBed.inject(BandService);
    formBuilder = TestBed.inject(FormBuilder);

    spyOn(bandService, 'getBands').and.returnValue(of(BANDS_ARRAY));

    component = fixture.componentInstance;
    component.collectorID = 1;
    component.bands = BANDS_ARRAY;

    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorFavoritePerformersComponent);
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

  it('create performer succesfully', () => {

    // spy on event emitter
    component = fixture.componentInstance;
    component.collectorID = 1;

    const spy = spyOn(collectorService, 'addfavoritePerformers').and.returnValue(of(true));
    component.createFavoritePerformer();
    expect(spy).toHaveBeenCalled();

  });

  it('create performer failure', () => {
    // spy on event emitter
    component = fixture.componentInstance;
    component.collectorID = 1;

    const spy = spyOn(collectorService, 'addfavoritePerformers').and.returnValue(throwError({status: 404}));
    component.createFavoritePerformer();
    expect(spy).toHaveBeenCalled();
  });

  it('change performer', () => {
    // spy on event emitter
    component = fixture.componentInstance;
    component.changePerformer({ target : {value : 1 } });
    expect(component.favoritePerformerForm.get('performerId').value).toBe(1);
  });

});
