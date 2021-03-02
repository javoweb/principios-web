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

const PERFORMERPRIZE_OBJECT = new PerformerPrize(12, new Date());

const MUSICIAN_OBJECT = new Musician(13, '12432', '2135', '1325', new Date(), [PERFORMERPRIZE_OBJECT]);

const PRIZE_OBJECT = new Prize('sdaf', 'sadf', 'asdf', []);

describe('MusicianDetailComponent', () => {
  let component: MusicianDetailComponent;
  let fixture: ComponentFixture<MusicianDetailComponent>;
  let prizeService: PrizeService;
  let musicianService: MusicianService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ MusicianDetailComponent ],
      providers: [PrizeService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicianDetailComponent);
    prizeService = TestBed.inject(PrizeService);
    musicianService = TestBed.inject(MusicianService);
    spyOn(prizeService, 'getPrize').and.returnValue(of(PRIZE_OBJECT));
    spyOn(musicianService, 'getMusicians').and.returnValue(of([MUSICIAN_OBJECT]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPrizes', () => {
    component.musician = MUSICIAN_OBJECT;
    component.getPrizes();
    expect(component.prizes).not.toBeNull();
  });
});
