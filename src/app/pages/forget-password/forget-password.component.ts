import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { ResetPasswordsDto } from 'src/app/dtos/LoginDTO/ResetPaswwordDTO';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {


  private resetPassword:string=localStorage.getItem('EmailUser')!;
  private  resetPasswordGet =this.resetPassword;
  isDarkMode:boolean=false;
  language: string |null=null;
  input:ResetPasswordsDto=new ResetPasswordsDto();


  constructor(private translate: TranslateService,private darkModeService: DarkModeService,public backend:MainService,private toastr:ToastrService,public spinner:NgxSpinnerService,private router:Router){

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }


  ngOnInit(){

    this.language =localStorage.getItem('language');

    this.translate.onLangChange.subscribe(() => {

      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });
   
  }



  EiditePassword(){

    if(this.input.UserName==undefined || this.input.UserName==''){
      this.toastr.warning(this.translate.instant('toastor.ForgetPassword.name'));
      return;
  
      }
      
      if(this.input.NewPassword==undefined || this.input.NewPassword==''){
        this.toastr.warning(this.translate.instant('toastor.ForgetPassword.Password'));
        return;
        }
  
      if(this.input.UserName!=this.resetPasswordGet){
        this.toastr.warning(this.translate.instant('toastor.ForgetPassword.Invalid'));
        return;
  
      }
      
   
    
    this.spinner.show()
  this.backend.ResetPassword(this.input).subscribe(src=>{
  
    this.spinner.hide()
    this.toastr.success(this.translate.instant('toastor.ForgetPassword.Reset'))
    this.router.navigate(['/Login']);
  
  },err=>{
  
    this.spinner.hide()
    this.toastr.error(this.translate.instant('toastor.ForgetPassword.Failed'))
  
  }
  )
  
  
  
  }
  
  
  NaivageteToLogin(){
  
    this.router.navigate(['Login']);
  }
  






}



