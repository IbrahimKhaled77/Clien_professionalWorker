import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { RatingDTO } from 'src/app/dtos/CongirmDialog/CongirmDialog';
import { orderGetAllDto } from 'src/app/dtos/OrderDTO/GetAllOrderDTO';



@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],

})
export class RatingComponent {

  input: RatingDTO = new RatingDTO();

  constructor(public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: orderGetAllDto,private translate: TranslateService, private route: ActivatedRoute, public backend: MainService, private toastr: ToastrService, private router: Router, public spinner: NgxSpinnerService

  ) { }



  updateRating() {



    this.input.orderId = this.data.orderId;
    this.input.rate = this.data.rate;




    console.log(this.input.orderId);


    this.spinner.show()
    this.backend.UpdateRating(this.input).subscribe(src => {

      this.spinner.hide()
      this.toastr.success(this.translate.instant('toastor.Rating.Rating'))
      this.dialogRef.close();

    }, err => {

      this.spinner.hide()
      console.log(err)
      this.toastr.error(this.translate.instant('toastor.Rating.Failed'))

    }
    )



  }




  ClickNo() {

    this.dialogRef.close(false)

  }


  ClickYes() {

    this.updateRating();
  }



}
