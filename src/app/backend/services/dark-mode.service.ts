import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {

  bool:boolean=localStorage.getItem("isDarkMode") === "true"
  private isDarkModeSubject = new BehaviorSubject<boolean>(this.bool);
  isDarkMode$ = this.isDarkModeSubject.asObservable();


  toggleDarkMode() {
    const currentMode = this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(!currentMode);
  }


  setDarkMode(value: boolean) {
    this.isDarkModeSubject.next(value);
  }
}
