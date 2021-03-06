import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Album } from './album';
import { environment } from '../../environments/environment';
import { Track } from './track';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiUrl = environment.baseUrl + 'albums';

  constructor(private http: HttpClient) { }

  public getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  public getAlbum(id: number): Observable<Album> {
    return this.http.get<Album>(this.apiUrl + '/' + id);
  }


  public addComment(id: number, newComment: any): Observable<boolean> {

     return this.http.post<true>(this.apiUrl + '/' + id + '/comments' , newComment);
  }


  public addTrack(id: number, newTrack: any): Observable<boolean> {
    return this.http.post<true>(this.apiUrl + '/' + id + '/tracks' , newTrack);


  }

}
