import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collector } from './collector';
import { CollectorAlbum } from './collectorAlbum';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  private apiUrl = environment.baseUrl + 'collectors';

  constructor(private http: HttpClient) { }

  public getCollectors(): Observable<Collector[]> {
    return this.http.get<Collector[]>(this.apiUrl);
  }

  public getCollector(id: number): Observable<Collector> {
    return this.http.get<Collector>(this.apiUrl + '/' + id);
  }

  public getAlbumFromCollector(id: number): Observable<CollectorAlbum[]> {
    return this.http.get<CollectorAlbum[]>(this.apiUrl + '/' + id + '/albums');
  }

  public addfavoritePerformers(idCollector: number, idPerformer: number, newPerformer: any): Observable<boolean> {
    return this.http.post<true>(this.apiUrl + '/' + idCollector + '/bands/' + idPerformer, newPerformer);
  }

  public addAlbums(idCollector: number, idAlbum: number, newAlbum: any): Observable<boolean> {
    return this.http.post<true>(this.apiUrl + '/' + idCollector + '/albums/' + idAlbum , newAlbum);
  }

}

