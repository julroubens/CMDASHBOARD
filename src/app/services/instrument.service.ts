import { Injectable } from '@angular/core';
import {BaseUrl} from "../model/base-url";
import {HttpClient} from "@angular/common/http";
import {Instrument} from "../model/instrument";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  baseUrl = BaseUrl.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Instrument[]> {
    return this.httpClient.get<Instrument[]>(this.baseUrl + 'instruments');
  }

  getById(id: number): Observable<Instrument> {
    return this.httpClient.get<Instrument>(
      `${this.baseUrl + 'instruments/'}${id}`
    );
  }

  create(instrument: Instrument): Observable<Instrument> {
    return this.httpClient.post<Instrument>(
      this.baseUrl + 'instruments',
      instrument
    );
  }

  update(id: number, instrument: Instrument): Observable<Instrument> {
    return this.httpClient.put<Instrument>(
      `${this.baseUrl + 'instruments/'}${id}`,
      instrument
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${this.baseUrl + 'instruments/'}${id}`
    );
  }
}
