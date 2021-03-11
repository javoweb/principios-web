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

const PRIZE_OBJECT = new Prize(1, 'sdaf', 'sadf', 'asdf', []);

const PERFORMERPRIZE_OBJECT = new PerformerPrize(12, new Date(), PRIZE_OBJECT);

const BANDA_OBJECT = new Band(13, '12432', '2135', '1325', new Date(), [], [PERFORMERPRIZE_OBJECT]);

describe('BandDetailComponent', () => {
  let component: BandDetailComponent;
  let fixture: ComponentFixture<BandDetailComponent>;
  let prizeService: PrizeService;
  let bandService: BandService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ BandDetailComponent ],
      providers: [PrizeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandDetailComponent);
    prizeService = TestBed.inject(PrizeService);
    bandService = TestBed.inject(BandService);
    spyOn(prizeService, 'getPrize').and.returnValue(of(PRIZE_OBJECT));
    spyOn(bandService, 'getBands').and.returnValue(of([BANDA_OBJECT]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPrizes', () => {
    component.band = BANDA_OBJECT;
    component.performerPrizes = [PERFORMERPRIZE_OBJECT];
    component.getPrizes();
    expect(component.prizes).not.toBeNull();
  });
});
