import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { serviceGetByIdDto } from 'src/app/dtos/ServiceDto/ServiceByIdDTO';

@Component({
  selector: 'app-get-service-by-id',
  templateUrl: './get-service-by-id.component.html',
  styleUrls: ['./get-service-by-id.component.scss']
})


export class GetServiceByIdComponent implements OnInit {


  input: serviceGetByIdDto = new serviceGetByIdDto();
  serviceId: number = 0;
  isDarkMode: boolean = false;
  language: string | null = null;
  quantityUnits: string[] = ['Kilogram', 'Gram', 'Liter', 'Milliliter', 'Meter', 'Centimeter', 'Kilometer', 'Inch', 'Foot', 'Yard', 'Piece'];

  constructor(private translate: TranslateService, private darkModeService: DarkModeService, private route: ActivatedRoute, public backend: MainService, private toastr: ToastrService, private router: Router, public spinner: NgxSpinnerService) {


    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));

  }


  ngOnInit() {

    this.language = localStorage.getItem('language');


    const serviceIdString = this.route.snapshot.paramMap.get('ServiceId');
    if (serviceIdString) {
      this.serviceId = parseInt(serviceIdString, 10);
      this.CilckServiceById(this.serviceId); 
    }

    this.translate.onLangChange.subscribe(() => {
  
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });
  }


  CilckServiceById(ServiceId: number) {
    this.spinner.show();
    this.backend.GetServiceDetails(ServiceId).subscribe(
      (data) => {
        this.spinner.hide();
        this.input = data;


       
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(this.translate.instant('toastor.GetServiceById.Failed'));
        console.error(error);
      }
    );

  }



  CilckOrder(event: Event) {
    event.preventDefault()

    this.router.navigate(['/CreateOrder', this.serviceId]).then(() => {
      document.getElementById('CreateOrder')?.scrollIntoView({
  
        block: 'start',
        inline: 'nearest'
      });
    });

  }



}