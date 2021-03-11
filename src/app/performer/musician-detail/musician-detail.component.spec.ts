/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MusicianDetailComponent } from './musician-detail.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Musician } from '../musician';
import { Prize } from '../prize';
import { PerformerPrize } from '../performerPrize';
import { PrizeService } from '../prize.service';
import { MusicianService } from '../musician.service';
import { PerformerPrizeService } from '../performerPrize.service';

const PRIZE_OBJECT = new Prize(1, 'sdaf', 'sadf', 'asdf', []);

const PERFORMERPRIZE_OBJECT = new PerformerPrize(12, new Date(), PRIZE_OBJECT);

const MUSICIAN_OBJECT = new Musician(13, '12432', '2135', '1325', new Date(), [PERFORMERPRIZE_OBJECT]);

describe('MusicianDetailComponent', () => {
  let component: MusicianDetailComponent;
  let fixture: ComponentFixture<MusicianDetailComponent>;
  let prizeService: PrizeService;
  let performerPrizeService: PerformerPrizeService;
  let musicianService: MusicianService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ MusicianDetailComponent ],
      providers: [PrizeService, PerformerPrizeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianDetailComponent);
    prizeService = TestBed.inject(PrizeService);
    performerPrizeService = TestBed.inject(PerformerPrizeService);
    musicianService = TestBed.inject(MusicianService);
    spyOn(prizeService, 'getPrize').and.returnValue(of(PRIZE_OBJECT));
    spyOn(performerPrizeService, 'getPerformerPrizes').and.returnValue(of([PERFORMERPRIZE_OBJECT]));
    spyOn(musicianService, 'getMusicians').and.returnValue(of([MUSICIAN_OBJECT]));
    spyOn(musicianService, 'getMusician').and.returnValue(of(MUSICIAN_OBJECT));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPrizes', () => {
    component.musician = MUSICIAN_OBJECT;
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
    component.musician = MUSICIAN_OBJECT;
    component.assignPrizeMode(true);
    expect(component.isOnAssignPrizeMode).toEqual(true);
    component.changePrizesState(true);
    expect(component.isOnAssignPrizeMode).toEqual(false);
  });

  it('not update prize tables', () => {
    component.musician = MUSICIAN_OBJECT;
    component.assignPrizeMode(true);
    expect(component.isOnAssignPrizeMode).toEqual(true);
    component.changePrizesState(false);
    expect(component.isOnAssignPrizeMode).toEqual(false);
  });
});
