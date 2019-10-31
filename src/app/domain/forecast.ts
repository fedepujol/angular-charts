import { Weather } from './weather';

export class Forecast {

    constructor() { }

    public consolidated_weather: Weather[]
    public sun_rise: String
    public sun_set: String
    public parent: string

}