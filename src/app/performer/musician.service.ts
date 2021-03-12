import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musician } from './musician';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  private apiUrl = environment.baseUrl + 'musicians/';

  constructor(private http: HttpClient) { }

  getMusicians(): Observable<Musician[]> {
    return this.http.get<Musician[]>(this.apiUrl);
  }

  getMusician(id: number): Observable<Musician> {
    return this.http.get<Musician>(this.apiUrl + id.toString());
  }

}
