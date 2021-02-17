import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CollectorListarComponent } from './collector-listar.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CollectorService } from '../collector.service';
import { Collector } from '../collector';

const COLLECTOR_OBJECT: Collector[] = [new Collector(1, 'Juan Perez', 32323, 'p@p.cl')];

describe('CollectorListarComponent', () => {
  let component: CollectorListarComponent;
  let fixture: ComponentFixture<CollectorListarComponent>;
  let collectorService: CollectorService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ CollectorListarComponent ],
      providers: [CollectorService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorListarComponent);
    collectorService = TestBed.inject(CollectorService);
    spyOn(collectorService, 'getCollectors').and.returnValue(of(COLLECTOR_OBJECT));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
