/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AlbumService } from './album.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import {delay} from 'rxjs/operators';
import { of } from 'rxjs';

import { Album } from './album';

describe('Service: Album', () => {
  let httpTestingController: HttpTestingController;
  let albumService: AlbumService;
  let baseUrl = environment.baseUrl+"albums";
  let album: Album;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });

    httpTestingController = TestBed.get(HttpTestingController)

    album={
      "id": 100,
      "name": "Buscando América",
      "cover": "https://i.pinimg.com/564x/aa/5f/ed/aa5fed7fac61cc8f41d1e79db917a7cd.jpg",
      "releaseDate": "1984-08-01T05:00:00.000Z",
      "description": "Buscando América es el primer álbum de la banda de Rubén Blades y Seis del Solar lanzado en 1984. La producción, bajo el sello Elektra, fusiona diferentes ritmos musicales tales como la salsa, reggae, rock, y el jazz latino. El disco fue grabado en Eurosound Studios en Nueva York entre mayo y agosto de 1983.",
      "genre": "Salsa",
      "recordLabel": "Elektra",
      "tracks": [
          {
              "id": 100,
              "name": "Decisiones",
              "duration": "5:05"
          },
          {
              "id": 101,
              "name": "Desapariciones",
              "duration": "6:29"
          }
      ],
      "performers": [
          {
              "id": 100,
              "name": "Rubén Blades Bellido de Luna",
              "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ruben_Blades_by_Gage_Skidmore.jpg/800px-Ruben_Blades_by_Gage_Skidmore.jpg",
              "description": "Es un cantante, compositor, músico, actor, abogado, político y activista panameño. Ha desarrollado gran parte de su carrera artística en la ciudad de Nueva York.",
              "birthDate": "1948-07-16T05:00:00.000Z"
          }
      ],
      "comments": [
          {
              "id": 100,
              "description": "The most relevant album of Ruben Blades",
              "rating": 5
          }
      ]
  };


  });

  beforeEach(inject(
        [AlbumService],
        (service: AlbumService) => {
          albumService = service;
        }
      ));




  it('Test Get ALL Albums',()=>{

    let result: Album[];


    albumService.getAlbums().subscribe(t => {
      result=t;
    })

    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });
       
    req.flush([album]);

    expect(result[0].id).toEqual(100);


  });


  it('Test Get Single Albums',()=>{

    let result: Album;


    albumService.getAlbum(album.id).subscribe(t => {
      result=t;
    })

    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl+"/"+album.id
    });
       
    req.flush(album);

    expect(result.id).toEqual(album.id);


  });

});
