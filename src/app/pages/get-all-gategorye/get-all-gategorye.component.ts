import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { categoryAllDto } from 'src/app/dtos/Category/CategoryAllDto/CategoryAllDto';
import { GetServiceAllDto } from 'src/app/dtos/ServiceDto/ServiceDtoAll';

@Component({
  selector: 'app-get-all-gategorye',
  templateUrl: './get-all-gategorye.component.html',
  styleUrls: ['./get-all-gategorye.component.scss']
})
export class GetAllGategoryeComponent {

  showAll: boolean = true;

  categoryAll: categoryAllDto[] = [];

  categoryAll2: categoryAllDto[] = [];
  GetServiceAllDto: GetServiceAllDto[] = [];

  isshowAll: boolean = true;

  isDarkMode: boolean = false;
  language: string | null = null;

  constructor(private translate: TranslateService, public backend: MainService, private darkModeService: DarkModeService, private toastr: ToastrService, public spinner: NgxSpinnerService, private router: Router) {

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }



  ngOnInit() {

    this.language = localStorage.getItem('language');


    
    this.spinner.show();
    this.backend.GetCategoryAll().subscribe(rre => {

      this.spinner.hide();
      this.categoryAll = rre;
      this.categoryAll2 = rre;


    }, err => {
      this.spinner.hide();
      console.log(err);
      this.toastr.error(this.translate.instant('toastor.GetAllGategorye.Category'));
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
      this.GetServiceAllDto = data
    
      this.router.navigate(['/ServiceAll', categorId]).then(() => {
        document.getElementById('ServiceAll')?.scrollIntoView({

          block: 'start',
          inline: 'nearest'
        });
      });


    }, err => {
      this.spinner.hide();
      this.toastr.error(this.translate.instant('toastor.GetAllGategorye.service'));
      console.log(err);

    });





  }


  boolIsshowAll(){

this.isshowAll=true

  }


  boolIsshowNew(){

    this.isshowAll=false
    
      }
 
}










/*
switchTab(tab: string) {
  this.showAll = tab == 'all' ?true:false;
  if (tab === 'all') {
    // تحميل كل العناصر
    this.categoryAll =  this.categoryAll;
  } else if (tab === 'new') {
    // تحميل فقط أول 6 عناصر
    this.categoryAll2 =  this.categoryAll2.slice(0, 6);
  }
}
*/
