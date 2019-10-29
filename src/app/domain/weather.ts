import * as moment from 'moment';

export class Weather {

    constructor() { }

    public weather_state_name: string
    public wind_direction_compass: string
    public created: string
    public applicable_date: string
    public min_temp: number
    public max_temp: number
    public the_temp: number
    public wind_speed: number
    public wind_direction: number
    public air_pressure: number
    public humidity: number
    public visibility: number
    public predictability: number
    public time: string

    public normalizeWeather() {
        this.normalizeMaxTemp()
        this.normalizeMinTemp()
        this.normalizeTime()
        this.normalizeDate()
    }

    private normalizeMaxTemp() {
        console.log('hor')
        this.max_temp = Math.round(this.max_temp * 10) / 10
    }

    private normalizeMinTemp() {
        this.min_temp = Math.round(this.min_temp * 10) / 10
    }

    private normalizeTime() {
        this.time = moment(this.applicable_date).format('HH:00')
    }

    private normalizeDate() {
        this.created = moment(this.created).format('DD/MM/YYYY')
        this.applicable_date = moment(this.applicable_date).format('DD/MM/YYYY')
    }
}