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
  DIGIT9 = 57
}

@Component({
  selector: 'app-road',
  templateUrl: './road.component.html',
  styleUrls: ['./road.component.css']
})
export class RoadComponent implements OnInit, OnChanges {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    if(event.keyCode === KEY_CODE.DIGIT8){
      this.consequence = null;
      this.kill = null;
      this.roadHazard = null;
      this._router.navigate(['road']);
    }
    if(event.keyCode === KEY_CODE.SPACE){
      console.log('1-------', this.milesToGo);
      let hazard = Math.floor(Math.random()*100)
      console.log(hazard)
      if(hazard <= 25){
        this.roadHazard = this._httpService.getRoadHazard();
        console.log(this.roadHazard)
        console.log(this.roadHazard.message)
      }
      if(this.currentCrew === null){
        this.message = "Game Over.  Press 9 to start over"
      } 
      if(this.currentProvisions.fuel === 0){
        this.message = "You ran out of fuel.  Your Road Trip is over.  Press 9 to start over."
      }
      
      
      else if(this.milesToGo <= 20){
        console.log('2-------', this.milesToGo);
        this._httpService.addTravel();
        this._router.navigate(['city']);
      }
      else if(this.currentProvisions.food === 0){
        this.food = "You ran out of snacks and now people are screaming for food"
        this._httpService.subMiles();
        this._httpService.subFuel();
        this.getInfo();
      }
      else{
        this._httpService.subMiles();
        this._httpService.subFuel();
        this.getInfo();
      }
    }
    if(event.keyCode === KEY_CODE.DIGIT9){
      this._router.navigate([''])
    }
    if(this.roadHazard != null && event.keyCode === KEY_CODE.DIGIT1){
      let crewKey = Object.keys(this.currentCrew)
      if(this.roadHazard.title === 'hitchHikerKill' && crewKey.length > 1){
        console.log(`This is the amount of people left${crewKey.length}`)
        this.kill = this._httpService.subCrew(crewKey.length);
        this.consequence =  `Dennis the hitchhiker has murdered ${this.kill}.  You are super bummed, but decided to move on.  Press 8 to continue.`
      }
      if(this.roadHazard.title === 'hitchHikerKill' && crewKey.length === 1){
        this.consequence = "Game Over!!! Dennis has killed everyone. Press 9 to start over."
      }
      if(this.roadHazard.title === 'hitchHikerGood'){
        this.consequence = "You gave the nice person a ride to where they needed to go...and they returned the favor.  They also gave you money. Press 8 to continue"
        let num = Math.floor(Math.random()*100)
        this._httpService.addMoney(`${num}`)

      }
      if(this.roadHazard.title === 'breakDown'){
        this._httpService.fixCar();
        this.consequence = 'You have fixed your car. You can now move on. Press 8 to continue.'
      }
    }
    if(this.roadHazard != null && event.keyCode === KEY_CODE.DIGIT2){
      if(this.roadHazard.title === 'breakDown' && this.money > 100){
        this.consequence = 'You have to fix your car before you can move on.'
      }
      if(this.roadHazard.title === 'breakDown' && this.money <100){
        this.consequence = 'GAME OVER!!! Press 9 to start over.9'
      }
      if(this.roadHazard.title === 'hitchHikerGood'){
        this.consequence = "You decided to leave the poor soul on the side of the road. Press 8 to continue"
      }
      if(this.roadHazard.title === 'hitchHikerKill'){
        this.consequence = "You decided to leave the poor soul on the side of the road.  Press 8 to continue"
      }
    }
  }

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getInfo();
  }
  ngOnChanges(){
    this.getInfo();
  }
  currentProvisions: any;
  currentCrew: any;
  vehicle: any;
  money: any;
  milesToGo: any;
  message: any;
  food: any;
  roadHazard: any;
  consequence: any;
  kill: any;
  getInfo(){
    this.currentCrew = this._httpService.getCrew();
    console.log(this.currentCrew)
    this.vehicle = this._httpService.getVehicle();
    console.log(this.vehicle);
    this.money = this._httpService.getMoney();
    console.log(this.money);
    this.currentProvisions = this._httpService.getProvision();
    console.log(this.currentProvisions);
    this.milesToGo = this._httpService.getMiles();
    console.log('MIles to go',this.milesToGo)
    this._router.navigate(['road'])
  }
}
