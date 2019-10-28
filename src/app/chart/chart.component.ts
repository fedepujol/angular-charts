import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Weather } from '../domain/weather';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartTemp = []
  dailyMaxTemp: Number[]
  dailyMinTemp: Number[]

  constructor(public route: ActivatedRoute,
    public weatherService: WeatherService) { }

  ngOnInit() {
    this.getForecast()
  }

  getForecast(): void {
    const woeid = +this.route.snapshot.paramMap.get('woeid')
    this.weatherService.dailyForecast(woeid)
      .toPromise()
      .then(response => {
        console.log(response.consolidated_weather)
        response = this.filtrarFechas(response)
        let allTimes = this.getAllTimes(response).reverse()
        this.confDailyTemp(response)
        this.confChart(allTimes)
      })
      .catch(e => { console.log(e.message) })
  }

  getMaxTemps(weatherArray: Weather[]): Number[] {
    return weatherArray.map(item => Math.round(item.max_temp * 100) / 100)
  }

  getMinTemps(weatherArray: Weather[]): Number[] {
    return weatherArray.map(item => Math.round(item.min_temp * 100) / 100)
  }

  getAllTimes(weatherArray: Weather[]): String[] {
    return weatherArray.map(item => this.filtroHoras(item))
  }

  filtrarFechas(weatherArray: Weather[]): Weather[] {
    let aux = moment(new Date).format('DD/MM/YYYY')
    return weatherArray.filter(item => moment(item.created).format('DD/MM/YYYY') == aux)
  }

  filtroHoras(unWeather: Weather): String {
    return moment(unWeather.created).format('HH:00')
  }

  filtrarNull(tempArray: Number[]): Number[] {
    return tempArray.filter(Boolean)
  }

  spliceReverseArray(unArray: Number[], unNumero: number, otroNumero: number) {
    return unArray.reverse()
  }

  confDailyTemp(unArray: Weather[]): void {
    this.dailyMaxTemp = this.spliceReverseArray(this.filtrarNull(this.getMaxTemps(unArray)), 1, 10)
    this.dailyMinTemp = this.spliceReverseArray(this.filtrarNull(this.getMinTemps(unArray)), 1, 10)
  }

  confChart(timesArray: String[]): void {
    this.chartTemp = new Chart('canvas', {
      type: 'line',
      data: {
        labels: timesArray,
        datasets: [
          {
            data: this.dailyMaxTemp,
            borderColor: "#d45a5a",
            fill: false
          },
          {
            data: this.dailyMinTemp,
            borderColor: "#3eb1ea",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: 'true',
          text: moment(new Date).format('DD/MM/YYYY')
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    })
  }
}