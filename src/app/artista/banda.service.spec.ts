import { TestBed } from '@angular/core/testing';

import {
 HttpTestingController,
 HttpClientTestingModule,
} from '@angular/common/http/testing';

import faker from 'faker';

import { BandaService } from './banda.service';
import { Banda } from './banda';
import { environment } from '../../environments/environment';

describe('BandaService', () => {
 let service: BandaService;
 let httpMock: HttpTestingController;
 const apiUrl = environment.baseUrl + 'bands';

 beforeEach(() => {
   TestBed.configureTestingModule({
     imports: [HttpClientTestingModule],
     providers: [BandaService],
   });

   service = TestBed.inject(BandaService);
   httpMock = TestBed.inject(HttpTestingController);
 });

 afterEach(() => {
   httpMock.verify();
 });

 it('getBandas() should return 10 records', () => {
   const mockPosts: Banda[] = [];

   for (let i = 0; i < 10; i++) {

     const banda = new Banda(
       faker.random.number(),
       faker.name.findName(),
       faker.internet.url(),
       faker.lorem.sentence(),
       faker.date.past()
     );
     mockPosts.push(banda);
   }

   service.getBandas().subscribe((bandas) => {
     expect(bandas.length).toBe(10);
   });

   const req = httpMock.expectOne(apiUrl);
   expect(req.request.method).toBe('GET');
   req.flush(mockPosts);
 });

 it('getBandas() should return 0 records', () => {
  const mockPosts: Banda[] = [];

  service.getBandas().subscribe((bandas) => {
    expect(bandas.length).toBe(0);
  });

  const req = httpMock.expectOne(apiUrl);
  expect(req.request.method).toBe('GET');
  req.flush(mockPosts);
});
});
