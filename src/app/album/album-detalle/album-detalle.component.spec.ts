import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumDetalleComponent } from './album-detalle.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from '../album.service';
import { Observable } from 'rxjs';
import { Album } from '../album';
import { Track } from '../track';
import { Comment } from '../comment';
import { Performer } from '../../performer/performer';

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

describe('AlbumDetalleComponent', () => {
  let component: AlbumDetalleComponent;
  let fixture: ComponentFixture<AlbumDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [AlbumDetalleComponent],
      providers: [AlbumService]
    }).compileComponents();

    const albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'getAlbum').and.returnValue(of(ALBUM_OBJECT));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetalleComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Get Performer Name', () => {
    expect(component.getPerformerName(ALBUM_OBJECT)).toBe(
      ALBUM_OBJECT.performers[0].name
    );
  });

  it('Get Album', () => {
    component.albumID = 1;
    component.getAlbum();
    expect(component.album).not.toBeNull();
  });

  it('Add Commnent Button', () => {
    component.addComment();
    expect(component.isOnCommentEditMode).toBe(true);
  });

  it('onCommentStatusChanged', () => {
    component.isOnCommentEditMode = false;
    component.onCommentStatusChanged(true);
    expect(component.isOnCommentEditMode).toBe(false);

    component.onCommentStatusChanged(false);
    expect(component.isOnCommentEditMode).toBe(false);
  });

  it('Add Track Button', () => {
    component.addTrack();
    expect(component.isOnTrackEditMode).toBe(true);
  });

  it('onTrackStatusChanged', () => {
    component.isOnCommentEditMode = false;
    component.onTrackStatusChanged(true);
    expect(component.isOnCommentEditMode).toBe(false);

    component.onTrackStatusChanged(false);
    expect(component.isOnCommentEditMode).toBe(false);
  });
});
