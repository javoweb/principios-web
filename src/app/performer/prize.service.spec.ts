import { TestBed } from '@angular/core/testing';

import {
 HttpTestingController,
 HttpClientTestingModule,
} from '@angular/common/http/testing';

import faker from 'faker';

import { PrizeService } from './prize.service';
import { Prize } from './prize';
import { environment } from '../../environments/environment';

describe('PrizeService', () => {
  let service: PrizeService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'prizes/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrizeService],
    });

    service = TestBed.inject(PrizeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getPrizes() should return correct records', () => {

    const mockPosts = new Prize(
    faker.name.findName(),
      faker.name.findName(),
      faker.lorem.sentence(),
      []
    );

    const id: number = faker.random.number();

    service.getPrize(id).subscribe((prize) => {
      expect(prize.name).toBe(mockPosts.name);
    });

    const req = httpMock.expectOne(apiUrl + id.toString());
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
