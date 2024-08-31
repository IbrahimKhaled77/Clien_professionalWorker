import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { GetOrderByIdDto } from 'src/app/dtos/OrderDTO/GetOrderByIdDTO';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {



 input:GetOrderByIdDto=new GetOrderByIdDto();
 orderId: number=0;
 status: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

  
 isDarkMode:boolean=false;
 language: string | null = null;
  constructor(private translate: TranslateService, private darkModeService: DarkModeService,private route: ActivatedRoute,public backend:MainService,private toastr:ToastrService,private router:Router,public spinner:NgxSpinnerService){

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));

  
  }



  ngOnInit(){
   
    this.language = localStorage.getItem('language');

    const OrderIdString  = this.route.snapshot.paramMap.get('orderId');
    if (OrderIdString ) {
      this.orderId = parseInt(OrderIdString, 10);
      this.CilckOrderById(this.orderId); 
    }


    this.translate.onLangChange.subscribe(() => {
     
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });


  }



  CilckOrderById(orderId: number){
    this.spinner.show();
    this.backend.GetOrderDetails(orderId).subscribe(
      (data) => {
        this.spinner.hide();
        this.input = data;
       
       
        this.toastr.success(this.translate.instant('toastor.Confirmation.successfully'));
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(this.translate.instant('toastor.Confirmation.Failed'));
        console.error(error);
      }
    );

  }
 

CilckOrder(){

  this.router.navigate(['/']).then(() => {
  document.getElementById('Home')?.scrollIntoView({
    block: 'start',
    inline: 'nearest'
  });
});
 
}


}
