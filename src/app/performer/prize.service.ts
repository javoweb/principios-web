import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prize } from './prize';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private apiURL = environment.baseUrl + 'prizes/';

  constructor( private http: HttpClient) { }

  getPrize(id: number): Observable<Prize> {
    return this.http.get<Prize>(this.apiURL + id.toString());
  }

  createPrize(newPrize: object): Observable<boolean> {
    return this.http.post<true>(this.apiURL, newPrize);
  }

  getPrizes(): Observable<Prize[]> {
    return this.http.get<Prize[]>(this.apiURL);
  }

}
