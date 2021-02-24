/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectorDetalleComponent } from './collector-detalle.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CollectorService } from '../collector.service';
import { Observable } from 'rxjs';
import { Collector } from '../collector';
import { Performer } from '../../performer/performer';
import { PerformerPrize } from '../../performer/performerPrize';

const PERFORMER_PRIZE_OBJECT = new PerformerPrize(12, new Date());
const FAVORITE_PERFORMER_OBJECT = new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd', [PERFORMER_PRIZE_OBJECT]);
const SCOLLECTOR_OBJECT: Collector = new Collector(1, 'Juan Perez', 32323, 'p@p.cl', [FAVORITE_PERFORMER_OBJECT]);


describe('CollectorDetalleComponent', () => {
  let component: CollectorDetalleComponent;
  let fixture: ComponentFixture<CollectorDetalleComponent>;
  let collectorService: CollectorService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ CollectorDetalleComponent ],
      providers: [CollectorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorDetalleComponent);
    collectorService = TestBed.inject(CollectorService);
    spyOn(collectorService, 'getCollector').and.returnValue(of(SCOLLECTOR_OBJECT));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
