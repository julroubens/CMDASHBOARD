import { Injectable } from '@angular/core';
import {BaseUrl} from "../model/base-url";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EntityType} from "../model/entity-type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntityTypeService {
  baseUrl = BaseUrl.baseUrl;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  list(): Observable<EntityType[]> {
    return this.httpClient.get<EntityType[]>(this.baseUrl + 'entityTypes');
  }

  post(entityType: EntityType): Observable<void> {
    return this.httpClient.post<void>(this.baseUrl + 'entityTypes', entityType);
  }

  delete(entityTypeId: number): Observable<void> {
    return this.httpClient.delete<void>(
      this.baseUrl + 'entityTypes/' + entityTypeId
    );
  }

  put(entityTypeId: number, entityType: EntityType): Observable<void> {
    return this.httpClient.put<void>(
      `${this.baseUrl}entityTypes/${entityTypeId}`,
      entityType
    );
  }
}
