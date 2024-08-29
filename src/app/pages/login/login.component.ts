import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { LoginDto } from 'src/app/dtos/LoginDTO/LoginDTO';
import { jwtDecode } from 'jwt-decode';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  input:LoginDto= new LoginDto();
  isDarkMode:boolean=false;
  language: string |null=null;
  constructor(private translate: TranslateService,private darkModeService: DarkModeService,private router:Router,public backend:MainService,private toastr:ToastrService,public spinner:NgxSpinnerService){

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }
  ngOnInit(){
    this.language =localStorage.getItem('language');

    this.translate.onLangChange.subscribe(() => {
      // React to language change if needed
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });
  }

Login(event:Event) {

  event.preventDefault()
  if (!this.input.UserName) {
    this.toastr.warning(this.translate.instant('toastor.Login.username'));
    return;
  }
  
  if (!this.input.Password) {
    this.toastr.warning(this.translate.instant('toastor.Login.password'));
    return;
  }

  this.spinner.show();
  this.backend.Login(this.input).subscribe(data => {
    this.spinner.hide();
   
    if (!data) {
      this.toastr.error(this.translate.instant('toastor.Login.Success'));
      return;
    }
    
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', data);

    let decodedToken: any;
    try {
      decodedToken = jwtDecode(data);
    } catch (error) {
      this.toastr.error(this.translate.instant('toastor.Login.failed'));
      return;
    }

    localStorage.setItem('UserId', decodedToken.UserId);
    localStorage.setItem('EmailUser', decodedToken.Email);
    localStorage.setItem('UserType', decodedToken.UserType);
    
    this.toastr.success(this.translate.instant('toastor.Login.token'));
    this.router.navigate(['/Main']);
  }, err => {
    this.spinner.hide();
    this.toastr.error(this.translate.instant('toastor.Login.Wrong'));
  });
}



NaivageteToRestpassword(){
  this.router.navigate(['/ForgetPassword']);


}



}

