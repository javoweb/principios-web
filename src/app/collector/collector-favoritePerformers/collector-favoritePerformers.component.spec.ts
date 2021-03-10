/* tslint:disable:no-unused-variable */
import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorFavoritePerformersComponent } from './collector-favoritePerformers.component';
import { CollectorService } from 'src/app/collector/collector.service';
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
      providers: [CollectorService, ToastrService, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorFavoritePerformersComponent);
    component = fixture.componentInstance;
    collectorService = TestBed.inject(CollectorService);
    formBuilder = TestBed.inject(FormBuilder);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
