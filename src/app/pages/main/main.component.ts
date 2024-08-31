import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { categoryAllDto } from 'src/app/dtos/Category/CategoryAllDto/CategoryAllDto';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {


  categoryAll: categoryAllDto[] = [];

  isDarkMode: boolean = false;

  language: string | null = null;

  constructor(private translate: TranslateService, private darkModeService: DarkModeService, public backend: MainService, private toastr: ToastrService, public spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute) {

    

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }

  ngOnInit() {
   
    this.language = localStorage.getItem('language');
 

    this.spinner.show();

    this.backend.GetCategoryAll().subscribe(rre => {

      
      this.spinner.hide();
      this.categoryAll = rre

      console.log(this.categoryAll);

    }, err => {
      this.spinner.hide();
      console.log(err);
      this.toastr.error(this.translate.instant('toastor.Main.Category'));
    });

    this.translate.onLangChange.subscribe(() => {
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });




  }



  CilckCategory(categorId: number | undefined, event: Event) {

    event.preventDefault()
    this.spinner.show();


    this.backend.GetServiceUserAll(categorId).subscribe(data => {

      console.log(data);
      this.spinner.hide();

  
      event.preventDefault();
      this.router.navigate(['/ServiceAll', categorId]).then(() => {
        document.getElementById('ServiceAll')?.scrollIntoView({
          block: 'start',
          inline: 'nearest'
        });
      });

    }, err => {
      this.spinner.hide();
      this.toastr.error(this.translate.instant('toastor.Main.service'));
      console.log(err);
      this.router.navigate(['/']);
    });




  }

  navCatagory(event: Event) {


    event.preventDefault();

    this.router.navigate(['/Catagori']).then(() => {
      document.getElementById('Catagoris')?.scrollIntoView({
        block: 'start',
        inline: 'nearest'
      });
    });

  }


}
