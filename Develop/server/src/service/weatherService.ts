import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;

}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Date;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: Date,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
// TODO: Define the baseURL, API key, and city name properties
class WeatherService {
 private baseURL: string;
 private apiKey: string;
 cityName: string;

  constructor(cityName: string, apiKey: string, baseURL: string) {
    this.baseURL = process.env."https://api.openweathermap.org" || '';
    this.apiKey = process.env."620079f3fc3e410b6615a716350a18d8" || '';
    this.cityName = cityName;
  }


  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
     private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}/geocode?address=${query}&key=${this.apiKey}`);
    return response.json();
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
     private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
      latitude: locationData.results[0].geometry.location.lat,
      longitude: locationData.results[0].geometry.location.lng
    };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
     private buildGeocodeQuery(): string {
    return `${this.baseURL}/geocode?address=${this.cityName}&key=${this.apiKey}`;
}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
     private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${this.apiKey}`;
}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
     private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
     private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
     private parseCurrentWeather(response: any) {
    return {
        temperature: response.current.temp,
        description: response.current.weather[0].description
    };
}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
     private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = weatherData.map((data: any) => ({
        temperature: data.temp.day,
        description: data.weather[0].description
    }));
    return [currentWeather, ...forecastArray];
}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
     async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
    return forecastArray;
}
}

export default new WeatherService();
