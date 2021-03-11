import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import faker from 'faker';
import { environment } from 'src/environments/environment';
import { PerformerPrize } from './performerPrize';
import { PerformerPrizeService } from './performerPrize.service';

describe('Service: PerformerPrize', () => {
  let service: PerformerPrizeService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.baseUrl + 'performerprizes/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerformerPrizeService]
    });

    service = TestBed.inject(PerformerPrizeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('getPerformerPrizes', () => {
    const mockPosts = [new PerformerPrize(
      faker.random.number(),
      new Date(),
      []
    )]

    service.getPerformerPrizes().subscribe((prizes) => {
      expect(prizes.length).toBe(1);
      expect(prizes[0].id).toBe(mockPosts[0].id)
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
