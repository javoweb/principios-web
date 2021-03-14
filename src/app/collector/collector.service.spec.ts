/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { CollectorService } from './collector.service';
import { Performer } from './../performer/performer';
import { PerformerPrize } from './../performer/performerPrize';
import { CollectorAlbum } from './collectorAlbum';
import { Album } from '../album/album';
import { Track } from '../album/track';
import { Comment } from '../album/comment';


import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';

import {delay} from 'rxjs/operators';
import { of } from 'rxjs';

import { Collector } from './collector';

describe('Service: Collector', () => {
  let httpMock: HttpTestingController;
  let collectorService: CollectorService;
  const baseUrl = environment.baseUrl + 'collectors';
  let collector: Collector;
  let collectors: Array<Collector>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectorService],
    });

    collectorService = TestBed.inject(CollectorService);
    httpMock = TestBed.inject(HttpTestingController);

    const PERFORMER_PRIZE_OBJECT = new PerformerPrize(12, new Date());
    const FAVORITE_PERFORMER_OBJECT = new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd', [PERFORMER_PRIZE_OBJECT]);

    const ALBUM_OBJECT: Album = new Album(
      1,
      'dfd',
      'sdfsd',
      'dfd',
      'dsfd',
      'dfsd',
      'dfds',
      [new Track(1, 'sdfs', 'sdfsd')],
      [new Performer(1, 'sdfsd', 'sdfsd', 'sdfsd')],
      [new Comment(1, 'dsfs', 5)]
    );
    const SCOLLECTORALBUM_OBJECT: CollectorAlbum = new CollectorAlbum(1, 500, 'Active', ALBUM_OBJECT);
    const COLLECTORALBUM_ARRAY: CollectorAlbum[] = [];
    COLLECTORALBUM_ARRAY.push(SCOLLECTORALBUM_OBJECT);

    collector = {
      id: 100,
      name: 'Juan Perez',
      telephone : 1234555,
      email : 'jp@mail.cl',
      favoritePerformers: [FAVORITE_PERFORMER_OBJECT],
      collectorAlbums: [SCOLLECTORALBUM_OBJECT]
    };

    collectors = [];
    collectors.push(collector);
    collectors.push(collector);
    collectors.push(collector);

  });

  afterEach(() => {
    httpMock.verify({ignoreCancelled: true});
    });

  it('Test todos los Collectors', () => {

    collectorService.getCollectors().subscribe(t => {
      expect(t.length).toBe(3);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: baseUrl
    });

    expect(req.request.method).toEqual('GET');
    req.flush(collectors);


  });

  it('Test one Collector', () => {

    collectorService.getCollector(collector.id).subscribe(t => {
      expect(t).toBe(collector);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: baseUrl + '/' + collector.id
    });

    expect(req.request.method).toEqual('GET');
    req.flush(collector);

  });

  it('Test Collector Album', () => {

    collectorService.getAlbumFromCollector(collector.id).subscribe(t => {
      expect(t).toBe(collector.collectorAlbums);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: baseUrl + '/' + collector.id + '/albums'
    });

    expect(req.request.method).toEqual('GET');
    req.flush(collector.collectorAlbums);

  });

  it('Test Add favoritePerformers', () => {
    const performerTest = 100;
    collectorService.addfavoritePerformers(collector.id, performerTest, []).subscribe(t => {
      expect('').toBe('');
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: baseUrl + '/' + collector.id + '/bands/' + performerTest
    });

    expect(req.request.method).toEqual('POST');
    req.flush('');
  });

  it('Test Add AlbumCollecter', () => {
    const albumTest = 100;
    const albumData = {
      price: 1500,
      status: 'Active'
    };
    collectorService.addAlbums(collector.id, albumTest, albumData).subscribe(t => {
      expect('').toBe('');
    });

    const req = httpMock.expectOne({
      method: 'POST',
      url: baseUrl + '/' + collector.id + '/albums/' + albumTest
    });

    expect(req.request.method).toEqual('POST');
    req.flush('');
  });

});
