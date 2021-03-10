/* tslint:disable:no-unused-variable */
import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CollectorAlbumComponent } from './collector-album.component';
import { CollectorService } from 'src/app/collector/collector.service';
import { AlbumService } from 'src/app/album/album.service';
import { HttpClientModule } from '@angular/common/http';
import { Collector } from 'src/app/collector/collector';
import { Album } from 'src/app/album/album';
import { Track } from 'src/app/album/track';
import { Performer } from 'src/app/performer/performer';
import { Comment } from 'src/app/album/comment';


import { Observable, of, throwError } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import faker from 'faker';

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

const ALBUMS_ARRAY: Album[] = [];
ALBUMS_ARRAY.push(ALBUM_OBJECT);


describe('CollectorAlbumComponent', () => {
  let component: CollectorAlbumComponent;
  let fixture: ComponentFixture<CollectorAlbumComponent>;
  let albumService: AlbumService;
  let collectorService: CollectorService;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [ CollectorAlbumComponent ],
      providers: [CollectorService, ToastrService, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorAlbumComponent);
    collectorService = TestBed.inject(CollectorService);
    albumService = TestBed.inject(AlbumService);
    formBuilder = TestBed.inject(FormBuilder);

    spyOn(albumService, 'getAlbums').and.returnValue(of(ALBUMS_ARRAY));

    component = fixture.componentInstance;
    component.collectorID = 1;
    component.albums = ALBUMS_ARRAY;


    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cancel creation', () => {

    // spy on event emitter
    component = fixture.componentInstance;
    spyOn(component.SaveCancel, 'emit');
    component.cancelCreation();
    fixture.detectChanges();
    expect(component.SaveCancel.emit).toHaveBeenCalledWith(false);
  });

  it('create album succesfully', () => {

    // spy on event emitter
    component = fixture.componentInstance;
    component.collectorID = 1;

    const spy = spyOn(collectorService, 'addAlbums').and.returnValue(of(true));
    component.createAlbum();
    expect(spy).toHaveBeenCalled();

  });

  it('create album failure', () => {
    // spy on event emitter
    component = fixture.componentInstance;
    component.collectorID = 1;

    const spy = spyOn(collectorService, 'addAlbums').and.returnValue(throwError({status: 404}));
    component.createAlbum();
    expect(spy).toHaveBeenCalled();
  });

  it('change album', () => {
    // spy on event emitter
    component = fixture.componentInstance;
    component.changeAlbum({ target : {value : 1 } });
    expect(component.albumForm.get('albumId').value).toBe(1);
  });

});
