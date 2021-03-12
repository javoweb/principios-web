import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Band } from './band';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  private apiUrl = environment.baseUrl + 'bands/';

  constructor(private http: HttpClient) { }

  getBands(): Observable<Band[]>{
    return this.http.get<Band[]>(this.apiUrl);
  }

  getBand(id: number): Observable<Band>{
    return this.http.get<Band>(this.apiUrl + id.toString());
  }

}
