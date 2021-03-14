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
import { CollectorAlbum } from '../collectorAlbum';
import { Album } from '../../album/album';
import { Track } from '../../album/track';
import { Comment } from '../../album/comment';

const PERFORMER_PRIZE_OBJECT = new PerformerPrize(12, new Date());
const FAVORITE_PERFORMER_OBJECT = new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd', [PERFORMER_PRIZE_OBJECT]);
const SCOLLECTOR_OBJECT: Collector = new Collector(1, 'Juan Perez', 32323, 'p@p.cl', [FAVORITE_PERFORMER_OBJECT], []);

const ALBUM_OBJECT: Album = new Album(
  1,
  'dfd',
  'sdfsd',
  'dfd',
  'dsfd',
  'dfsd',
  'dfds',
  [new Track(1, 'sdfs', 'sdfsd')],
  [new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd')],
  [new Comment(1, 'dsfs', 5)]
);
const SCOLLECTORALBUM_OBJECT: CollectorAlbum = new CollectorAlbum(1, 500, 'Active', ALBUM_OBJECT);
const COLLECTORALBUM_ARRAY: CollectorAlbum[] = [];
COLLECTORALBUM_ARRAY.push(SCOLLECTORALBUM_OBJECT);


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
    spyOn(collectorService, 'getAlbumFromCollector').and.returnValue(of(COLLECTORALBUM_ARRAY));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get Collector', () => {
    component.collectorID = 1;
    component.getCollector();
    expect(component.collector).not.toBeNull();
  });

  it('Get Collector Album', () => {
    component.collectorID = 1;
    component.getCollector();
    expect(component.albumsFromCollector).not.toBeNull();
  });

  it('Add FavoritePerformers Button', () => {
    component.addFavoritePerformers();
    expect(component.isOnfavoritePerformersEditMode).toBe(true);
  });

  it('Add CollectorAlbums Button', () => {
    component.addCollectorAlbums();
    expect(component.isOncollectorAlbumsEditMode).toBe(true);
  });

  it('onFavoritePerformersStatusChanged', () => {
    component.isOnfavoritePerformersEditMode = false;
    component.onFavoritePerformersStatusChanged(true);
    expect(component.isOnfavoritePerformersEditMode).toBe(false);

    component.onFavoritePerformersStatusChanged(false);
    expect(component.isOnfavoritePerformersEditMode).toBe(false);
  });

  it('onCollectorAlbumsStatusChanged', () => {
    component.isOncollectorAlbumsEditMode = false;
    component.onCollectorAlbumsStatusChanged(true);
    expect(component.isOncollectorAlbumsEditMode).toBe(false);

    component.onCollectorAlbumsStatusChanged(false);
    expect(component.isOncollectorAlbumsEditMode).toBe(false);
  });




});
