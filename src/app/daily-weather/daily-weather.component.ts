import { Component, OnInit } from '@angular/core';
import { Weather, SVG_URL } from '../domain/weather';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-daily-weather',
  templateUrl: './daily-weather.component.html',
  styleUrls: ['./daily-weather.component.css']
})
export class DailyWeatherComponent implements OnInit {

  public weathers: Weather[]

  constructor(public weatherService: WeatherService,
    public route: ActivatedRoute) { }

  ngOnInit() {
    this.getData()
  }

  getData() {
    const woeid = +this.route.snapshot.paramMap.get('woeid')
    this.weatherService.dailyForecast(woeid)
      .toPromise()
      .then(response => {
        this.weathers = response.consolidated_weather
        this.weathers.map(item => {
          item.max_temp = Math.round(item.max_temp * 10) / 10
          item.min_temp = Math.round(item.min_temp * 10) / 10
          item.created = moment(item.created).format('DD/MM/YYYY')
          item.applicable_date = moment(item.applicable_date).format('DD/MM/YYYY')
          item.weather_svg = SVG_URL + item.weather_state_abbr + '.svg'
        })
      })
      .catch(e => { console.log(e.message) })
  }
}
