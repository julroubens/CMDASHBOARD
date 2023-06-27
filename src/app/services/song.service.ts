import { Injectable } from '@angular/core';
import { BaseUrl } from '../model/base-url';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Song } from '../model/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  baseUrl = BaseUrl.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Song[]> {
    return this.httpClient.get<Song[]>(this.baseUrl + 'songs');
  }

  getById(id: number): Observable<Song> {
    return this.httpClient.get<Song>(`${this.baseUrl + 'songs/'}${id}`);
  }

  create(song: Song): Observable<Song> {
    return this.httpClient.post<Song>(this.baseUrl + 'songs', song);
  }

  update(id: number, song: Song): Observable<Song> {
    return this.httpClient.put<Song>(
      `${this.baseUrl + 'songs/'}${id}`,
      song
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl + 'songs/'}${id}`);
  }
}
