import { TestBed } from '@angular/core/testing';

import {
 HttpTestingController,
 HttpClientTestingModule,
} from '@angular/common/http/testing';

import faker from 'faker';

import { BandService } from './band.service';
import { Band } from './band';
import { environment } from '../../environments/environment';

describe('BandService', () => {
 let service: BandService;
 let httpMock: HttpTestingController;
 const apiUrl = environment.baseUrl + 'bands';

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [BandService],
   });

   service = TestBed.inject(BandService);
   httpMock = TestBed.inject(HttpTestingController);
 });

 afterEach(() => {
   httpMock.verify();
 });

 it('getBands() should return 10 records', () => {
   const mockPosts: Band[] = [];

   for (let i = 0; i < 10; i++) {

     const banda = new Band(
       faker.random.number(),
       faker.name.findName(),
       faker.internet.url(),
       faker.lorem.sentence(),
       faker.date.past()
     );
     mockPosts.push(banda);
   }

   service.getBands().subscribe((bandas) => {
     expect(bandas.length).toBe(10);
   });

   const req = httpMock.expectOne(apiUrl);
   expect(req.request.method).toBe('GET');
   req.flush(mockPosts);
 });

 it('getBands() should return 0 records', () => {
  const mockPosts: Band[] = [];

  service.getBands().subscribe((bandas) => {
    expect(bandas.length).toBe(0);
  });

  const req = httpMock.expectOne(apiUrl);
  expect(req.request.method).toBe('GET');
  req.flush(mockPosts);
});
});
