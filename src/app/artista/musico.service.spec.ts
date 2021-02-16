import { TestBed } from '@angular/core/testing';

import {
 HttpTestingController,
 HttpClientTestingModule,
} from '@angular/common/http/testing';

import faker from 'faker';

import { MusicoService } from './musico.service';
import { Musico } from './musico';
import { environment } from '../../environments/environment';

describe('MusicoService', () => {
 let service: MusicoService;
 let httpMock: HttpTestingController;
 const apiUrl = environment.baseUrl + 'musicians';

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [MusicoService],
   });

   service = TestBed.inject(MusicoService);
   httpMock = TestBed.inject(HttpTestingController);
 });

 afterEach(() => {
   httpMock.verify();
 });

 it('getMusicos() should return 10 records', () => {
   const mockPosts: Musico[] = [];

   for (let i = 0; i < 10; i++) {

     const musico = new Musico(
       faker.random.number(),
       faker.name.findName(),
       faker.internet.url(),
       faker.lorem.sentence(),
       faker.date.past()
     );
     mockPosts.push(musico);
   }

   service.getMusicos().subscribe((musicos) => {
     expect(musicos.length).toBe(10);
   });

   const req = httpMock.expectOne(apiUrl);
   expect(req.request.method).toBe('GET');
   req.flush(mockPosts);
 });

 it('getMusicos() should return 0 records', () => {
  const mockPosts: Musico[] = [];

  service.getMusicos().subscribe((musicos) => {
    expect(musicos.length).toBe(0);
  });

  const req = httpMock.expectOne(apiUrl);
  expect(req.request.method).toBe('GET');
  req.flush(mockPosts);
});
});