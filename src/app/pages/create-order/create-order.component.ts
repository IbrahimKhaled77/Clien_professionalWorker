import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { CreateOrderDto } from 'src/app/dtos/OrderDTO/CreateOrderDTO';
import { serviceGetByIdDto } from 'src/app/dtos/ServiceDto/ServiceByIdDTO';
import { Location } from '@angular/common';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],

  
})
export class CreateOrderComponent {

  input:CreateOrderDto= new CreateOrderDto();

  input2:serviceGetByIdDto=new serviceGetByIdDto();

  islogin:boolean=true;

  serviceId: number=0; 

  isDarkMode:boolean=false;
  language: string |null=null;

  constructor( private translate: TranslateService,private darkModeService: DarkModeService, private location: Location,private route: ActivatedRoute,private router:Router,public backend:MainService,private toastr:ToastrService,public spinner:NgxSpinnerService){

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }



  ngOnInit(){
   
    this.language =localStorage.getItem('language');

 
   
   
    const serviceIdIdString  = this.route.snapshot.paramMap.get('ServiceId');
    if (serviceIdIdString ) {
      this.serviceId = parseInt(serviceIdIdString, 10);
     this.input.serviceId=this.serviceId;
     this.OnServiceById(this.input.serviceId);
     this.input.usersId= parseInt( localStorage.getItem('UserId')!);

    
    }


    this.translate.onLangChange.subscribe(() => {
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });


  }



  OnServiceById(ServiceId: number){
    this.spinner.show();
    this.backend.GetServiceDetails(ServiceId).subscribe(
      (data) => {
        this.spinner.hide();
        this.input2 = data;
        this.input.title=this.input2.name;
       
   
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(this.translate.instant('toastor.CreateOrder.Failed'));
        console.error(error);
      }
    );

  }



  CreateNewOrder(event:Event){

    
    event.preventDefault()




    if(this.input.note == undefined || this.input.note == ''){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.Note'))
      return;
    }
    if(this.input.cardHolder == undefined || this.input.cardHolder == ''){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.CardHolder'))
      return;
    }
    if(this.input.cardNumber == undefined || this.input.cardHolder == '' ){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.CardNumber'))
      return;
    }
    if(this.input.address1 == undefined || this.input.address1 == '' ){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.address1'))
      return;
    }
    if(this.input.city == undefined || this.input.city == '' ){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.city'))
      return;
    }

    if(this.input.dateOrder == undefined ){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.Order'))
      return;
    }
    if(this.input.quantity == undefined ){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.Quantity'))
      return;
    }
    if(this.input.code == undefined  || this.input.code == ''){
      this.toastr.warning(this.translate.instant('toastor.CreateOrder.Code'))
      return;
    }
  
  

   
    this.spinner.show()
  
    this.backend.CreateOrder(this.input).subscribe(
      orderId => {
        this.spinner.hide();
        
        this.toastr.success(this.translate.instant('toastor.CreateOrder.successfully'));
      

        this.router.navigate(['/Confirmation', orderId]).then(() => {
          document.getElementById('Confirmation')?.scrollIntoView({
            block: 'start',
            inline: 'nearest'
          });
        });
      },  
    
      
      err => {
        this.spinner.hide();
        console.log(err);
    
        if (err.error && err.error.includes("IDX12741")) {
        
          this.toastr.error(this.translate.instant('toastor.CreateOrder.order'));
          this.islogin=false;
        } else if (err.status === 400 && err.error.includes("Object reference not set")) {
        
          this.toastr.error(this.translate.instant('toastor.CreateOrder.sent'));
        } else {
  
          this.toastr.error(this.translate.instant('toastor.CreateOrder.Pleaseagain'));
        }
      }
    );
  }



  goBack(event:Event) {
    event.preventDefault()
    this.location.back();
  }

  
}
