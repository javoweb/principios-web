import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Musico } from './musico';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicoService {

  private apiUrl = environment.baseUrl + 'musicians';

  constructor(private http:HttpClient) { }

  getMusicos(): Observable<Musico[]> {
    return this.http.get<Musico[]>(this.apiUrl)
}

}
