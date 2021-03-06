/* tslint:disable:no-unused-variable */
import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumTracksComponent } from './album-tracks.component';
import { AlbumService } from '../album.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AlbumTracksComponent', () => {
  let component: AlbumTracksComponent;
  let fixture: ComponentFixture<AlbumTracksComponent>;
  let albumService: AlbumService;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
      ],
      declarations: [AlbumTracksComponent],
      providers: [AlbumService, ToastrService, FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumTracksComponent);
    albumService = TestBed.inject(AlbumService);
    formBuilder = TestBed.inject(FormBuilder);

    component = fixture.componentInstance;
    component.albumID = 1;

    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumTracksComponent);
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

  it('create track succesfully', () => {
    // spy on event emitter
    component = fixture.componentInstance;
    component.albumID = 1;

    const spy = spyOn(albumService, 'addTrack').and.returnValue(of(true));
    component.createTrack();
    expect(spy).toHaveBeenCalled();
  });

  it('create track failure', () => {
    // spy on event emitter
    component = fixture.componentInstance;
    component.albumID = 1;

    const spy = spyOn(albumService, 'addTrack').and.returnValue(
      throwError({ status: 404 })
    );
    component.createTrack();
    expect(spy).toHaveBeenCalled();
  });
});
