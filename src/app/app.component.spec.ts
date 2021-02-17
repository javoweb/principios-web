import { TestBed, async, ComponentFixtureAutoDetect, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumModule } from './album/album.module';
import { ArtistaModule } from './artista/artista.module';
import { AlbumService } from './album/album.service';
import { BandaService } from './artista/banda.service';
import { MusicoService } from './artista/musico.service';
import { CollectorModule } from './collector/collector.module';
import { Album } from './album/album';
import { Track } from './album/track';
import { Comment } from './album/comment';
import { Performer } from './performer/performer';
import { Banda } from './artista/banda';
import { Musico } from './artista/musico';
const ALBUM_OBJECT: Album[] = [new Album(
  1, 'dfd', 'sdfsd', 'dfd', 'dsfd', 'dfsd', 'dfds',
  [new Track(1, 'sdfs', 'sdfsd')],
  [new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd', 'sdfsd')],
  [new Comment(1, 'dsfs', 5)]
)];
const SALBUM_OBJECT: Album = new Album(
  1, 'dfd', 'sdfsd', 'dfd', 'dsfd', 'dfsd', 'dfds',
  [new Track(1, 'sdfs', 'sdfsd')],
  [new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd', 'sdfsd')],
  [new Comment(1, 'dsfs', 5)]
);
const BANDA_OBJECT: Banda[] = [new Banda(1, 'dsf', 'sdg', 'asdf', new Date)]
const MUSICO_OBJECT: Musico[] = [new Musico(1, 'dsf', 'sdg', 'asdf', new Date)]

let fixture: ComponentFixture<AppComponent>


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AlbumModule,
        ArtistaModule,
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
    const bandaService = TestBed.inject(BandaService);
    const musicoService = TestBed.inject(MusicoService);
    spyOn(albumService, "getAlbums").and.returnValue(of(ALBUM_OBJECT))
    spyOn(albumService, "getAlbum").and.returnValue(of(SALBUM_OBJECT))
    spyOn(musicoService, "getMusicos").and.returnValue(of(MUSICO_OBJECT))
    spyOn(bandaService, "getBandas").and.returnValue(of(BANDA_OBJECT))
  }));

  it('should create the app', async(() => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'My Vinils'`, async(() => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('My Vinils');
  }));

  it('should render h1 title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#mainTitle').textContent).toContain('My Vinils');
  });
});
