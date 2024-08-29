import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {



  isDarkMode: boolean = localStorage.getItem("isDarkMode")==='true';

  constructor(private darkModeService: DarkModeService) {

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));


  }




}
