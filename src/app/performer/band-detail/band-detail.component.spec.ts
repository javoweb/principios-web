/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BandDetailComponent } from './band-detail.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Band } from '../band';
import { Prize } from '../prize';
import { PerformerPrize } from '../performerPrize';
import { PrizeService } from '../prize.service';
import { BandService } from '../band.service';
import { PerformerPrizeService } from '../performerPrize.service';

const PRIZE_OBJECT = new Prize(1, 'sdaf', 'sadf', 'asdf', []);

const PERFORMERPRIZE_OBJECT = new PerformerPrize(12, new Date(), PRIZE_OBJECT);

const BANDA_OBJECT = new Band(13, '12432', '2135', '1325', new Date(), [], [PERFORMERPRIZE_OBJECT]);

describe('BandDetailComponent', () => {
  let component: BandDetailComponent;
  let fixture: ComponentFixture<BandDetailComponent>;
  let prizeService: PrizeService;
  let performerPrizeService: PerformerPrizeService;
  let bandService: BandService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ BandDetailComponent ],
      providers: [PrizeService, PerformerPrizeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandDetailComponent);
    prizeService = TestBed.inject(PrizeService);
    performerPrizeService = TestBed.inject(PerformerPrizeService);
    bandService = TestBed.inject(BandService);
    spyOn(prizeService, 'getPrize').and.returnValue(of(PRIZE_OBJECT));
    spyOn(performerPrizeService, 'getPerformerPrizes').and.returnValue(of([PERFORMERPRIZE_OBJECT]));
    spyOn(bandService, 'getBands').and.returnValue(of([BANDA_OBJECT]));
    spyOn(bandService, 'getBand').and.returnValue(of(BANDA_OBJECT));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPrizes', () => {
    component.band = BANDA_OBJECT;
    component.getPerformerPrizes();
    expect(component.prizes).not.toBeNull();
  });

  it('change create prize mode', () => {
    component.assignPrizeMode(true);
    expect(component.isOnAssignPrizeMode).toEqual(true);
    component.assignPrizeMode(false);
    expect(component.isOnAssignPrizeMode).toEqual(false);
  });

  it('update prize tables', () => {
    component.band = BANDA_OBJECT;
    component.assignPrizeMode(true);
    expect(component.isOnAssignPrizeMode).toEqual(true);
    component.changePrizesState(true);
    expect(component.isOnAssignPrizeMode).toEqual(false);
  });

  it('not update prize tables', () => {
    component.band = BANDA_OBJECT;
    component.assignPrizeMode(true);
    expect(component.isOnAssignPrizeMode).toEqual(true);
    component.changePrizesState(false);
    expect(component.isOnAssignPrizeMode).toEqual(false);
  });
});
