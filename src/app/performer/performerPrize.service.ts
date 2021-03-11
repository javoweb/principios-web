import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformerPrize } from './performerPrize';

@Injectable({
  providedIn: 'root'
})
export class PerformerPrizeService {
  private apiUrl = environment.baseUrl + 'performerprizes/';

constructor(private http: HttpClient) { }

getPerformerPrizes(): Observable<PerformerPrize[]> {
  return this.http.get<PerformerPrize[]>(this.apiUrl);
}

}
