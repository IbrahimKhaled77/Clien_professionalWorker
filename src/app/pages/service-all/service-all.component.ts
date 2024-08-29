import { Component, OnInit } from '@angular/core';
import { GetServiceAllDto } from 'src/app/dtos/ServiceDto/ServiceDtoAll';
import { MainService } from 'src/app/backend/main.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { serviceGetByIdDto } from 'src/app/dtos/ServiceDto/ServiceByIdDTO';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-service-all',
  templateUrl: './service-all.component.html',
  styleUrls: ['./service-all.component.scss']
})
export class ServiceAllComponent {

  input2: GetServiceAllDto[] = [];


  input: serviceGetByIdDto = new serviceGetByIdDto();

  categoryId: number = 0;

  language: string | null = null;

  isDarkMode: boolean = false;

  constructor(private translate: TranslateService, private route: ActivatedRoute, private darkModeService: DarkModeService,
    private backend: MainService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
  ) {

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));

  }
  ngOnInit() {
    this.language = localStorage.getItem('language');


    const categoryIdString = this.route.snapshot.paramMap.get('categorId');
    if (categoryIdString != null) {
      this.categoryId = parseInt(categoryIdString, 10);
      console.log(this.categoryId);
      this.backend.GetServiceUserAll(this.categoryId).subscribe(rdd => {

    
        this.spinner.hide();
        this.input2 = rdd;



       
      }, err => {
        this.spinner.hide();
        this.toastr.error(this.translate.instant('toastor.ServiceAll.Not'));
        console.log(err);
        this.router.navigate(['/']);
      });


    }
  
    this.translate.onLangChange.subscribe(() => {
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });



  }




  CilckService(ServiceId: number, event: Event) {
    event.preventDefault()
    this.spinner.show();
    this.backend.GetServiceDetails(ServiceId).subscribe(
      (data) => {
        this.spinner.hide();
        this.input = data;


        this.router.navigate(['/ServiceById', ServiceId]).then(() => {
          document.getElementById('ServiceById')?.scrollIntoView({
            block: 'start',
            inline: 'nearest'
          });
        });

       
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(this.translate.instant('toastor.ServiceAll.Failed'));
        console.error(error);
      }
    );

  }
}







/*
    this.route.paramMap.subscribe((params: ParamMap) => {
      let parmId = params.get('categoryId')
      if(parmId != null)
      this.categoryId = parseInt(parmId, 10)
      this.CilckService(this.categoryId);
    });
*/