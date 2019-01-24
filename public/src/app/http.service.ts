import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  vehicles: any = [
    { type: "Hooptie", strength: 45, speed: 55, seats: 4, fuel: 0 },
    { type: "Mom's SUV", strength: 100, speed: 85, seats: 7, fuel: 0 },
    { type: "Party Wagon", strength: 85, speed: 70, seats: 10, fuel: 0 }
  ]
  currentCrew: any;
  provisions: any = {
    food: 0,
    fuel: 0
  }
  money: Number = 1000
  travel: number = 0
  carKey: Number;
  miles: number;
  nextCity: any;
  roadHazards: any = [
    { title: 'hitchHikerKill', message: 'You see a hitchhiker on the side of the road.  Do you pick him up?'},
    {title: 'hitchHikerGood', message: 'You see a hitchhiker on the side of the road.  Do you pick him up?'},
    { title: 'breakDown', message: 'Your car broke down.  You must pay $100 to get it fixed. Do you want to fix it?' },
  ]

  constructor(private _http: HttpClient) { }
  createCrew(data) {
    console.log(data)
    this.currentCrew = data;
    console.log(this.currentCrew)
  }
  assignCarKey(num) {
    this.carKey = num;
  }
  setNextCity(name) {
    this.nextCity = name;
    console.log(this.nextCity)
  }
  getNextCity() {
    return this.nextCity;
  }
  setMiles(data) {
    this.miles = data;
    console.log(this.miles)
  }
  getCrew() {
    return this.currentCrew;
  }
  getTravel() {
    return this.travel;
  }
  getVehicle() {
    console.log(this.carKey)
    console.log(this.vehicles[`${this.carKey}`])
    return this.vehicles[`${this.carKey}`];
  }
  getMiles() {
    return this.miles;
  }
  getRoadHazard() {
    let hazard = Math.floor(Math.random()*3)
    return this.roadHazards[`${hazard}`]
  }
  subMiles() {
    let subMiles = Math.floor(+this.vehicles[`${this.carKey}`].speed / +2)
    console.log(subMiles)
    if (+subMiles > +this.miles) {
      this.miles = 0;
    }
    else {
      this.miles = +this.miles - +subMiles
    }
  }
  subFuel() {
    let subFuel = Math.floor(+this.provisions.fuel - +5)
    this.provisions.fuel = subFuel;
    if (this.provisions.food <= 0) {
      this.provisions.food = 0;
    }
    else {
      let subFood = Math.floor(+this.provisions.food - +2)
      this.provisions.food = subFood;
    }
  }
  subCrew(number){
    if(this.carKey === 0){
      let num = Math.floor(Math.random()*number)
      console.log(num)
      console.log(this.currentCrew)
      let crewArr = Object.values(this.currentCrew)
      let crewArr2 = Object.keys(this.currentCrew)
      if(crewArr2.length === 1){
        let crewKey = crewArr2[`${+0}`]
        let crewValue = crewArr[`${+0}`]
        delete this.currentCrew[`${crewKey}`]
        return crewValue
      }
      else{
        let crewKey = crewArr2[`${num}`]
        let crewValue = crewArr[`${num}`]
        delete this.currentCrew[`${crewKey}`]
        console.log(crewValue)
        return crewValue;
      }
    }
    if(this.carKey === 1){
      let num = Math.floor(Math.random()*6)
      console.log(num)
      console.log(this.currentCrew)
      let crewArr = Object.values(this.currentCrew)
      let crewArr2 = Object.keys(this.currentCrew)
      let crewKey = crewArr2[`${num}`]
      let crewValue = crewArr[`${num}`]
      if(crewArr2.length === 1){
        crewValue = crewArr[`${0}`];
        delete this.currentCrew[`${0}`]
        return crewValue
      }
      else{
        delete this.currentCrew[`${crewKey}`]
        console.log(crewValue)
        return crewValue;
      }
    }
    if(this.carKey == 2){
      let num = Math.floor(Math.random()*9)
      console.log(num)
      console.log(this.currentCrew)
      let crewArr = Object.values(this.currentCrew)
      let crewArr2 = Object.keys(this.currentCrew)
      let crewKey = crewArr2[`${num}`]
      let crewValue = crewArr[`${num}`]
      if(crewArr2.length === 1){
        crewValue = crewArr[`${0}`];
        delete this.currentCrew[`${0}`]
        return crewValue
      }
      else{
        delete this.currentCrew[`${crewKey}`]
        console.log(crewValue)
        return crewValue;
      }
    }
  }
  addTravel() {
    this.travel = +this.travel + +1;
  }
  getProvision() {
    console.log("getting to service")
    console.log(this.provisions)
    return this.provisions;
  }
  getMoney() {
    return this.money;
  }
  addMoney(num) {
    this.money = +this.money + +num;
  }
  subMoney(num){
      this.money = +this.money - +num;
  }
  addProvision(provision, cost) {
    console.log('provisions to add', provision, cost);
    this.provisions.food = +provision.food + +this.provisions.food;
    this.provisions.fuel = +provision.fuel + +this.provisions.fuel;
    this.money = +this.money - +cost;
    console.log(this.provisions)
    console.log(this.money)

  }
  fixCar(){
    this.money = +this.money - +100;
  }
  getCities() {
    console.log(`Getting cities`);
    return this._http.get('/cities');
  }
}
