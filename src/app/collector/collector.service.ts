import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Collector } from './collector';
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

  // public getCollector(id: number): Observable<Collector> {
  //   return this.http.get<Collector>(this.apiUrl + '/' + id);
  // }

}

