import { TestBed } from '@angular/core/testing';

import {
 HttpTestingController,
 HttpClientTestingModule,
} from '@angular/common/http/testing';

import faker from 'faker';

import { MusicianService } from './musician.service';
import { Musician } from './musician';
import { environment } from '../../environments/environment';

describe('MusicianService', () => {
 let service: MusicianService;
 let httpMock: HttpTestingController;
 const apiUrl = environment.baseUrl + 'musicians';

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [MusicianService],
   });

   service = TestBed.inject(MusicianService);
   httpMock = TestBed.inject(HttpTestingController);
 });

 afterEach(() => {
   httpMock.verify();
 });

 it('getMusicians() should return 10 records', () => {
   const mockPosts: Musician[] = [];

   for (let i = 0; i < 10; i++) {

     const musico = new Musician(
       faker.random.number(),
       faker.name.findName(),
       faker.internet.url(),
       faker.lorem.sentence(),
       faker.date.past()
     );
     mockPosts.push(musico);
   }

   service.getMusicians().subscribe((musicos) => {
     expect(musicos.length).toBe(10);
   });

   const req = httpMock.expectOne(apiUrl);
   expect(req.request.method).toBe('GET');
   req.flush(mockPosts);
 });

 it('getMusicians() should return 0 records', () => {
  const mockPosts: Musician[] = [];

  service.getMusicians().subscribe((musicos) => {
    expect(musicos.length).toBe(0);
  });

  const req = httpMock.expectOne(apiUrl);
  expect(req.request.method).toBe('GET');
  req.flush(mockPosts);
});
});
