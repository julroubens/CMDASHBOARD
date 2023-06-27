import { Injectable } from '@angular/core';
import { BaseUrl } from '../model/base-url';
import { HttpClient } from '@angular/common/http';
import { Album } from '../model/album';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  baseUrl = BaseUrl.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.baseUrl + 'albums');
  }

  getById(id: number): Observable<Album> {
    return this.httpClient.get<Album>(`${this.baseUrl + 'albums/'}${id}`);
  }

  create(album: Album): Observable<Album> {
    return this.httpClient.post<Album>(this.baseUrl + 'albums', album);
  }

  update(id: number, album: Album): Observable<Album> {
    return this.httpClient.put<Album>(
      `${this.baseUrl + 'albums/'}${id}`, album
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl + 'albums/'}${id}`);
  }
}
