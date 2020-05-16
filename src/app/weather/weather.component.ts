import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  lat;
  lng;
  weatherData;
  KEY = 'e632c88059d178d6871d65beeb92de78';
  URL = 'https://api.openweathermap.org/data/2.5/onecall?';
  // mainUrl = 'this.URL+'lat='+this.lat+'&lon='+this.lng+'&appid='+this.KEY'
  kelvinCelcius = -273.15;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLocation();
  }


  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            // console.log(this.lat)
            this.getWeatherData();
          }
        },
        (error: PositionError) => console.log(error));
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

getWeatherData() {
  // console.log(this.lat)
    this.http.get( this.URL + 'lat=' + this.lat + '&lon=' + this.lng + '&appid=' + this.KEY ).subscribe(
      (data) => {
        this.weatherData = data
        console.log(this.weatherData);
    },
    (err) => console.log(err),
    );
  }


}
