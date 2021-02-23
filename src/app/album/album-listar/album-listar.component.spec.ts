import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumListarComponent } from './album-listar.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { Track } from '../track';
import { Comment } from '../comment';
import { Performer } from '../../performer/performer';
const ALBUM_OBJECT: Album[] = [new Album(
  1, 'dfd', 'sdfsd', 'dfd', 'dsfd', 'dfsd', 'dfds',
  [new Track(1, 'sdfs', 'sdfsd')],
  [new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd')],
  [new Comment(1, 'dsfs', 5)]
)];

describe('AlbumListarComponent', () => {
  let component: AlbumListarComponent;
  let fixture: ComponentFixture<AlbumListarComponent>;
  let albumService: AlbumService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ AlbumListarComponent ],
      providers: [AlbumService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListarComponent);
    albumService = TestBed.inject(AlbumService);
    spyOn(albumService, 'getAlbums').and.returnValue(of(ALBUM_OBJECT));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
