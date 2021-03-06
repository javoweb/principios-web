/* tslint:disable:no-unused-variable */
import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumComentariosComponent } from './album-comentarios.component';
import { AlbumService } from '../album.service';
import { CollectorService } from 'src/app/collector/collector.service';
import { HttpClientModule } from '@angular/common/http';
import { Collector } from 'src/app/collector/collector';
import { Observable, of, throwError } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

const COLLECTOR_OBJECT: Collector[] = [new Collector(1, 'Juan Perez', 32323, 'p@p.cl', [])];

describe('AlbumComentariosComponent', () => {
  let component: AlbumComentariosComponent;
  let fixture: ComponentFixture<AlbumComentariosComponent>;
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
      declarations: [ AlbumComentariosComponent ],
      providers: [AlbumService, CollectorService, ToastrService, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComentariosComponent);
    albumService = TestBed.inject(AlbumService);
    collectorService = TestBed.inject(CollectorService);
    formBuilder = TestBed.inject(FormBuilder);


    spyOn(collectorService, 'getCollectors').and.returnValue(of(COLLECTOR_OBJECT));


    component = fixture.componentInstance;
    component.albumID = 1;
    component.collectors = COLLECTOR_OBJECT;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComentariosComponent);
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


  it('create comment succesfully', () => {

    // spy on event emitter
    component = fixture.componentInstance;
    component.albumID = 1;

    const spy = spyOn(albumService, 'addComment').and.returnValue(of(true));
    component.createComment();
    expect(spy).toHaveBeenCalled();

  });

  it('create comment failure', () => {

    // spy on event emitter
    component = fixture.componentInstance;
    component.albumID = 1;

    const spy = spyOn(albumService, 'addComment').and.returnValue(throwError({status: 404}));
    component.createComment();
    expect(spy).toHaveBeenCalled();


  });


  it('change collector', () => {

    // spy on event emitter
    component = fixture.componentInstance;

    component.changeCollector({ target : {value : 1 } });

    expect(component.commentForm.get('collectorId').value).toBe(1);

  });


});
