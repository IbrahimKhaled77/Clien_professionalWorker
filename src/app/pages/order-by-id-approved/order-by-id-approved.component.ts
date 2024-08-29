import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { orderGetAllDto } from 'src/app/dtos/OrderDTO/GetAllOrderDTO';
import { RatingComponent } from '../rating/rating.component';
import { MatDialog } from '@angular/material/dialog';
import { RatingDTO } from 'src/app/dtos/CongirmDialog/CongirmDialog';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-by-id-approved',
  templateUrl: './order-by-id-approved.component.html',
  styleUrls: ['./order-by-id-approved.component.scss']
})
export class OrderByIdApprovedComponent {

  orderGetAllDto: orderGetAllDto[] = [];

  status: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

  status2: string[] = ['قيد الانتظار', 'تم الشحن', 'تم التوصيل', 'تم الإلغاء'];

  ishowbutton: boolean = false;

  isDarkMode: boolean = true;

  language: string | null = null;

  constructor(private translate: TranslateService, private darkModeService: DarkModeService, public dialog: MatDialog, private route: ActivatedRoute, public backend: MainService, private toastr: ToastrService, private router: Router, public spinner: NgxSpinnerService) {

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));


  }








  ngOnInit() {
    this.language = localStorage.getItem('language');

    this.spinner.show();
    this.backend.GetOrderAll().subscribe(data => {

      console.log(data);
      this.spinner.hide();
      this.orderGetAllDto = data

    }, err => {
      this.spinner.hide();
      this.toastr.error(this.translate.instant('toastor.OrderByIdApproved.Found'));
      console.log(err);
     
    });

    this.translate.onLangChange.subscribe(() => {
     
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });

  }

  Rating(item: RatingDTO) {



    const dialogDelete = this.dialog.open(RatingComponent, {
      width: '500px',
      data: item,
    });


  }

}




































/*
OnUpdateOrder(item:OnUpdateOrder){
  const dialog=  this.dialog.open(EditeOrderDillogComponent, {
      width: '700px',
      data:item
    });

    dialog.afterClosed().subscribe(res=>{
      
      this.spinner.show()
   
      this.backend.GetOrderAll(true).subscribe(data=>{

        console.log(data);
        this.spinner.hide();
        this.orderGetAllDto=data
        this.dataSource3.data=this.orderGetAllDto;
  
  
      },err=>{
        this.spinner.hide();
        this.toastr.error("Not Found service ");
        console.log(err);
  
      });
  
  

  


  });

  }*/
