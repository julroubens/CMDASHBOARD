import { Injectable } from '@angular/core';
import {BaseUrl} from "../model/base-url";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entity} from "../model/entity";

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  baseUrl = BaseUrl.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Entity[]> {
    return this.httpClient.get<Entity[]>(this.baseUrl + 'entitys');
  }

  getById(id: number): Observable<Entity> {
    return this.httpClient.get<Entity>(`${this.baseUrl + 'entitys/'}${id}`);
  }

  create(entity: Entity): Observable<Entity> {
    return this.httpClient.post<Entity>(this.baseUrl + 'entitys', entity);
  }

  update(id: number, entity: Entity): Observable<Entity> {
    return this.httpClient.put<Entity>(
      `${this.baseUrl + 'entitys/'}${id}`,
      entity
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl + 'entitys/'}${id}`);
  }
}
