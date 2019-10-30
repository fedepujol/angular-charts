import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { LocationSearchComponent } from './location-search/location-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DailyWeatherComponent } from './daily-weather/daily-weather.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'search', component: LocationSearchComponent},
  {path: 'dailyForecast/:woeid', component: DailyWeatherComponent},
  {path: 'chart/:woeid', component: ChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
