/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Musician } from './musician';
import { Prize } from './prize';
import { Band } from './band';
import { PerformerPrize } from './performerPrize';
import { PrizeService } from './prize.service';
import { MusicianService } from './musician.service';
import { BandService } from './band.service';

import { PerformerComponent } from './performer.component';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

const PERFORMERPRIZE_OBJECT = new PerformerPrize(12, new Date());

const BANDA_OBJECT = new Band(13, '12432', '2135', '1325', new Date(), [], [PERFORMERPRIZE_OBJECT]);

const MUSICIAN_OBJECT = new Musician(13, '12432', '2135', '1325', new Date(), [PERFORMERPRIZE_OBJECT]);

const PRIZE_OBJECT = new Prize('sdaf', 'sadf', 'asdf', []);

describe('PerformerComponent', () => {
  let component: PerformerComponent;
  let fixture: ComponentFixture<PerformerComponent>;
  let prizeService: PrizeService;
  let musicianService: MusicianService;
  let bandService: BandService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ PerformerComponent ],
      providers: [PrizeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformerComponent);
    prizeService = TestBed.inject(PrizeService);
    musicianService = TestBed.inject(MusicianService);
    bandService = TestBed.inject(BandService);
    spyOn(prizeService, 'getPrize').and.returnValue(of(PRIZE_OBJECT));
    spyOn(musicianService, 'getMusicians').and.returnValue(of([MUSICIAN_OBJECT]));
    spyOn(bandService, 'getBands').and.returnValue(of([BANDA_OBJECT]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayMusician', () => {
    component.musicos = [MUSICIAN_OBJECT];
    component.displayMusician(0);
    expect(component.selectedMusician).toEqual(MUSICIAN_OBJECT);
    component.displayMusician(0);
    expect(component.selectedMusician).toBeNull();
  });

  it('displayBand', () => {
    component.bandas = [BANDA_OBJECT];
    component.displayBand(0);
    expect(component.selectedBand).toEqual(BANDA_OBJECT);
    component.displayBand(0);
    expect(component.selectedBand).toBeNull();
  });

  it('charToShow', () => {
    component.musicos = [MUSICIAN_OBJECT];
    component.bandas = [BANDA_OBJECT];
    expect(component.charToShow(0)).toEqual('+');
    component.displayMusician(0);
    expect(component.charToShow(0)).toEqual('-');
    expect(component.charToShow(0, 'band')).toEqual('+');
    component.displayBand(0);
    expect(component.charToShow(0, 'band')).toEqual('-');
  });
});
