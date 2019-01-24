import { Component, OnInit, HostListener, OnChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';
export enum KEY_CODE {
  SPACE = 32,
  DIGIT1 = 49,
  DIGIT2 = 50,
  DIGIT3 = 51
}
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnChanges {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    console.log(event)
    if(event.keyCode === KEY_CODE.DIGIT1){
      console.log("this is for hooptie")
      this.crew ={
        player1: '',
        player2: '',
        player3: '',
        player4: ''
      }
      this._httpService.addMoney(800);
      this.crewKeys = Object.keys;
      console.log(this.crewKeys)
      console.log(this.crew)
      this._httpService.assignCarKey(0);
    }
    if(event.keyCode === KEY_CODE.DIGIT2){
      console.log("this is for Mom's SUV")
      this.crew = {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: '',
        player6: '',
        player7: ''
      }
      this._httpService.addMoney(1400);
      this.crewKeys = Object.keys;
      this._httpService.assignCarKey(1);
    }
    if(event.keyCode === KEY_CODE.DIGIT3){
      console.log("this is for the Party Wagon")
      this.crew = {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        player5: '',
        player6: '',
        player7: '',
        player8: '',
        player9: '',
        player10: ''
      }
      this._httpService.addMoney(2000);
      this.crewKeys = Object.keys;
      this._httpService.assignCarKey(2);
    }
  }

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  ngOnChanges(){
    console.log(this.crew)
  }
  crew: any;
  crewKeys: any;
  newSubmit(){
    console.log(this.crew)
    let thisCrew = this._httpService.createCrew(this.crew);
    this._router.navigate(['city'])
  }


}
