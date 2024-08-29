import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  isDarkMode:boolean=false;


  constructor(private darkModeService: DarkModeService) {

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }
}
