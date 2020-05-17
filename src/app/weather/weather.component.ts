import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, AfterViewInit {
  @ViewChild('chart1') chart1: ElementRef<HTMLCanvasElement>;
  public ctx: CanvasRenderingContext2D;
  gradient;

  public lineChartData: ChartDataSets[] = [
    { data: [20, 29, 30, 21, 26, 15, 20], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartOptions: (ChartOptions & { annotation: any }) = {
  //   responsive: true,
  // };
  public lineChartColors: Color[] = [
    {
      borderColor: '#4fb1ea',
      backgroundColor: '#4fb1eace'
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  dt = new Date();
  activeData = 1;
  lat;
  lng;
  weatherData;
  KEY = 'e632c88059d178d6871d65beeb92de78';
  URL = 'https://api.openweathermap.org/data/2.5/onecall?';
  mainUrl = `${this.URL}lat=${this.lat}&lon=${this.lng}&appid=${this.KEY}`;
  kelvinCelcius = -273.15;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getLocation();
  }
  ngAfterViewInit(){
    this.gradient = this.chart1.nativeElement.getContext('2d');
    this.gradient = this.ctx.createLinearGradient(0, 0, 0, 400);
    this.gradient.addColorStop(0, 'rgba(229, 239, 255, 1)');
    this.gradient.addColorStop(1, 'rgba(229, 239, 255, 0)');

    this.lineChartColors = [
      {
        borderColor: '#4fb1ea',
        backgroundColor: this.gradient
      },
    ];
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
    this.http.get( `${this.URL}lat=${this.lat}&lon=${this.lng}&appid=${this.KEY}` ).subscribe(
      (data) => {
        this.weatherData = data
        console.log(this.weatherData);
    },
    (err) => console.log(err),
    );
  }

  showSelectedData(i){
    this.activeData = i;
  }
}
