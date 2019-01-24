import { Component, OnInit, HostListener, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';
export enum KEY_CODE {
  SPACE = 32,
  Z = 90
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit, OnChanges {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    console.log(event)
    if(event.keyCode === KEY_CODE.SPACE){
      console.log("this is for hooptie")
      this.provision ={
        food: 0,
        fuel: 0,
      }
      this.provisionKeys = Object.keys;
      console.log(this.provisionKeys)
      console.log(this.provision)
    }
    if(event.keyCode === KEY_CODE.Z){
      this._router.navigate(['city'])
    }
  }

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getProvisions();

  }
  ngOnChanges(){
    

  }
  money: any;
  error: any;
  currentProvisions: any;
  provision: any;
  provisionKeys: any;
  provisionSubmit(){
    let foodCost = this.provision.food * 1;
    let fuelCost = this.provision.fuel * 3;
    let totalCost = foodCost + fuelCost
    console.log(totalCost)
    let buy = this._httpService.getMoney()
    if(totalCost > buy){
      this.error = "You do not have enough money"
    }
    else{
      console.log(this.provision)
      let thisStore = this._httpService.addProvision(this.provision, totalCost);
      this._router.navigate(['city'])
    }
  }
  getProvisions(){
    this.currentProvisions = this._httpService.getProvision();
    this.money = this._httpService.getMoney();
  }

}
