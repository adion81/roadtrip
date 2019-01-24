import { Component, OnInit, OnChanges, HostListener } from '@angular/core';
import { HttpService } from '../http.service';
import { KeyEventsPlugin } from '@angular/platform-browser/src/dom/events/key_events';

export enum KEY_CODE {
  SPACE = 32
}
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnChanges {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent){
    console.log(event)
    if(event.keyCode === KEY_CODE.SPACE){
      console.log("this is spacebar")
    }
  }
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.displayCities()
  }
  ngOnChanges(){
    this.displayCities()
  }
  cities: any;


  displayCities(){
    let display = this._httpService.getCities();
    display.subscribe(data =>{
      this.cities = data;
      console.log(data)
    })
  }
  onKeyDown(event){
      console.log("you did it")
  }
  doThis(){
    console.log("it worked")
  }

}
