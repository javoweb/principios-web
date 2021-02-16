/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CollectorService } from './collector.service';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import {delay} from 'rxjs/operators';
import { of } from 'rxjs';

import { Collector } from './collector';

describe('Service: Collector', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let collectorService: CollectorService;
  let baseUrl = environment.baseUrl+"collectors";
  let collector: Collector;
  let collectors: Array<Collector>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectorService],
    });


    injector = getTestBed();
    collectorService = injector.get(CollectorService);
    httpMock = injector.get(HttpTestingController)

    collector={
      "id": 100,
      "name": "Juan Perez",
      "telephone" : 1234555,
      "email" : "jp@mail.cl"
    };

    collectors=[];
    collectors.push(collector);
    collectors.push(collector);
    collectors.push(collector);

  });

  afterEach(() => {
    httpMock.verify({ignoreCancelled: true});
    });

  it('Test todos los Collectors',()=>{

    collectorService.getCollectors().subscribe(t => {
      expect(t.length).toBe(3);
    })

    const req = httpMock.expectOne({
      method: "GET",
      url: baseUrl
    });
       
    expect(req.request.method).toEqual('GET');
    req.flush(collectors);


  });




});
