import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Weather } from './domain/weather';
import * as moment from 'moment';
import { WeatherLocation } from './domain/WeatherLocation';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = "http://localhost:4200/clima/location/"

  constructor(private httpClient: HttpClient) { }

  dailyForecast(woeid: Number): Observable<Weather[]> {
    return this.httpClient.get<Weather[]>(this.apiUrl + woeid + '/')
  }

  forecast(woeid: Number): Observable<Weather[]> {
    let fcast = woeid + '/' + this.getNow()
    return this.httpClient.get<Weather[]>(this.apiUrl + fcast)
  }

  searchLocation(term: String): Observable<WeatherLocation[]> {
    if (!term) {
      return of([])
    }
    return this.httpClient.get<WeatherLocation[]>(this.apiUrl + `search/?query=${term}`)
  }

  private getNow() {
    let month = moment().get('month') + 1
    return moment().get('year') + '/' + month + '/' + moment().get('date')
  }
}
