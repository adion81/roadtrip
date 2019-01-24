import { Component, OnInit, HostListener, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';
export enum KEY_CODE {
  SPACE = 32,
  DIGIT1 = 49,
  DIGIT2 = 50,
  DIGIT3 = 51,
  DIGIT4 = 52,
  DIGIT5 = 53,
  DIGIT6 = 54,
  DIGIT7 = 55,
  DIGIT8 = 56,
  DIGIT9 = 57,
  DIGIT0 = 58,
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if(event.keyCode === KEY_CODE.DIGIT1){
      console.log('Store')
      this._router.navigate(['store'])
    }
    if(event.keyCode === KEY_CODE.DIGIT2){
      console.log('Road')
      this._router.navigate(['road'])
    }

  }

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getProvisions();
    this.getCity();


  }
  currentProvisions: any;
  addProvisions: any;
  count: any;
  city: any;
  money: any;
  getCity(){
    let currentCity = this._httpService.getCities();
    currentCity.subscribe(data=>{
      this.city = data[this.count];
      console.log(data[this.count].south)
      console.log(data[this.count].citySouth)
      this._httpService.setMiles(data[this.count].south)
      this._httpService.setNextCity(data[this.count].citySouth)
      console.log(this.city)
    })
  }
  getProvisions(){
    console.log("hello")
    this.currentProvisions = this._httpService.getProvision();
    console.log(this.currentProvisions)
    this.count = this._httpService.getTravel();
    this.money = this._httpService.getMoney();
  }

}
