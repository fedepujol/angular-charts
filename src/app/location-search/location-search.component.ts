import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { WeatherLocation } from '../domain/WeatherLocation';
import * as randomFlatColors from 'random-flat-colors';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {

  locations$: Observable<WeatherLocation[]>

  private searchTerms = new Subject<String>()

  constructor(public weatherService: WeatherService) { }

  search(term: String) {
    this.searchTerms.next(term)
  }

  ngOnInit() {
    this.locations$ = this.searchTerms.pipe(
      /* Wait 300 miliSeg after each keystroke before considering the term */
      debounceTime(300),

      /* ignore new term if same as before */
      distinctUntilChanged(),

      /* Switch to new observable everytime the term changes */
      switchMap((term: String) => this.weatherService.searchLocation(term)
        .toPromise()
        .then(response => {
          response.forEach(item => {
            item.color = randomFlatColors()
          })
          return response
        })
      )
    )
  }


}
