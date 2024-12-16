import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AlarmMode, AlarmStatus, AlarmZone } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class HomesafeService {

  constructor() { }
  private http: HttpClient = inject(HttpClient)

  private readonly url = 'http://localhost:3000'

  getAlarmModesByUserId(userId: string){
    return this.http.get<AlarmMode[]>(this.url + `/alarm-mode?userId=${userId}`)
  }

  getAlarmModesByName(name: string){
    return this.http.get<AlarmMode[]>(this.url + `/alarm-mode?name=${name}`)
  }

  postAlarmMode(alarmMode: AlarmMode){
    return this.http.post<AlarmZone>(this.url + '/alarm-mode', alarmMode)
  }

  getAlarmZones(){
    return this.http.get<AlarmZone[]>(this.url + '/alarm-zones')
  }

  postStatusMode(alarmStatus: AlarmStatus){
    return this.http.post<AlarmZone>(this.url + '/alarm-status', alarmStatus)
  }

  getAlarmStatusByUserId(userId: string){
    return this.http.get<AlarmStatus[]>(this.url + `/alarm-status?userId=${userId}`)
  }




}
