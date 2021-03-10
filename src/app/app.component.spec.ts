import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumModule } from './album/album.module';
import { PerformerModule } from './performer/performer.module';
import { AlbumService } from './album/album.service';
import { BandService } from './performer/band.service';
import { MusicianService } from './performer/musician.service';
import { CollectorModule } from './collector/collector.module';
import { Album } from './album/album';
import { Track } from './album/track';
import { Comment } from './album/comment';
import { Performer } from './performer/performer';
import { Band } from './performer/band';
import { Musician } from './performer/musician';
import { Collector } from './collector/collector';
import { CollectorService } from './collector/collector.service';
import { PerformerPrize } from './performer/performerPrize';


const PERFORMER_PRIZE_OBJECT = new PerformerPrize(12, new Date());
const FAVORITE_PERFORMER_OBJECT = new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd', [PERFORMER_PRIZE_OBJECT]);
const SCOLLECTOR_OBJECT: Collector = new Collector(1, 'Juan Perez', 32323, 'p@p.cl', [FAVORITE_PERFORMER_OBJECT], []);
const COLLECTOR_OBJECT: Collector[] = [new Collector(1, 'Juan Perez', 32323, 'p@p.cl', [FAVORITE_PERFORMER_OBJECT], [])];

const ALBUM_OBJECT: Album[] = [new Album(
  1, 'dfd', 'sdfsd', 'dfd', 'dsfd', 'dfsd', 'dfds',
  [new Track(1, 'sdfs', 'sdfsd')],
  [new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd')],
  [new Comment(1, 'dsfs', 5)]
)];
const SALBUM_OBJECT: Album = new Album(
  1, 'dfd', 'sdfsd', 'dfd', 'dsfd', 'dfsd', 'dfds',
  [new Track(1, 'sdfs', 'sdfsd')],
  [new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd')],
  [new Comment(1, 'dsfs', 5)]
);
const BANDA_OBJECT: Band[] = [new Band(1, 'dsf', 'sdg', 'asdf', new Date(), [])];
const MUSICO_OBJECT: Musician[] = [new Musician(1, 'dsf', 'sdg', 'asdf', new Date())];

let fixture: ComponentFixture<AppComponent>;


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AlbumModule,
        PerformerModule,
        CollectorModule,
        AppRoutingModule,
        HttpClientModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    const albumService = TestBed.inject(AlbumService);
    const bandaService = TestBed.inject(BandService);
    const musicoService = TestBed.inject(MusicianService);
    const collectorService = TestBed.inject(CollectorService);
    spyOn(albumService, 'getAlbums').and.returnValue(of(ALBUM_OBJECT));
    spyOn(albumService, 'getAlbum').and.returnValue(of(SALBUM_OBJECT));
    spyOn(musicoService, 'getMusicians').and.returnValue(of(MUSICO_OBJECT));
    spyOn(bandaService, 'getBands').and.returnValue(of(BANDA_OBJECT));
    spyOn(collectorService, 'getCollectors').and.returnValue(of(COLLECTOR_OBJECT));
    spyOn(collectorService, 'getCollector').and.returnValue(of(SCOLLECTOR_OBJECT));
  }));

  it('should create the app', async(() => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'My Vinyls'`, async(() => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('My Vinyls');
  }));

  it('should render h1 title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#mainTitle').textContent).toContain('My Vinyls');
  });
});
