/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AlbumService } from './album.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import { Album } from './album';

describe('Service: Album', () => {
  let httpMock: HttpTestingController;
  let albumService: AlbumService;
  const baseUrl = environment.baseUrl + 'albums';
  let album: Album;
  let albums: Array<Album>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });


    albumService = TestBed.inject(AlbumService);
    httpMock = TestBed.inject(HttpTestingController);

    album = {
      id: 100,
      name: 'Buscando América',
      cover: 'https://i.pinimg.com/564x/aa/5f/ed/aa5fed7fac61cc8f41d1e79db917a7cd.jpg',
      releaseDate: '1984-08-01T05:00:00.000Z',
      description: 'Buscando América es el primer álbum de la banda de Rubén Blades y Seis del Solar lanzado en 1984. La producción, bajo el sello Elektra, fusiona diferentes ritmos musicales tales como la salsa, reggae, rock, y el jazz latino. El disco fue grabado en Eurosound Studios en Nueva York entre mayo y agosto de 1983.',
      genre: 'Salsa',
      recordLabel: 'Elektra',
      tracks: [
          {
              id: 100,
              name: 'Decisiones',
              duration: '5:05'
          },
          {
              id: 101,
              name: 'Desapariciones',
              duration: '6:29'
          }
      ],
      performers: [
          {
              id: 100,
              name: 'Rubén Blades Bellido de Luna',
              image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ruben_Blades_by_Gage_Skidmore.jpg/800px-Ruben_Blades_by_Gage_Skidmore.jpg',
              description: 'Es un cantante, compositor, músico, actor, abogado, político y activista panameño. Ha desarrollado gran parte de su carrera artística en la ciudad de Nueva York.'
          }
      ],
      comments: [
          {
              id: 100,
              description: 'The most relevant album of Ruben Blades',
              rating: 5
          }
      ]};

    albums = [];
    albums.push(album);
    albums.push(album);
    albums.push(album);

    });

  afterEach(() => {
    httpMock.verify({ignoreCancelled: true});
    });

  it('Test Get ALL Albums', () => {

    albumService.getAlbums().subscribe(t => {
      expect(t.length).toBe(3);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: baseUrl
    });

    expect(req.request.method).toEqual('GET');
    req.flush(albums);


    });


  it('Test Get Single Albums', () => {


    albumService.getAlbum(album.id).subscribe(t => {
      expect(t).toBe(album);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: baseUrl + '/' + album.id
    });

    expect(req.request.method).toEqual('GET');
    req.flush(album);


  });

});
