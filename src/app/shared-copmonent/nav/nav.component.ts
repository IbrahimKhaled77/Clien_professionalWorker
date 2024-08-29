import { ChangeDetectorRef, Component, LOCALE_ID, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { UserByIdDto } from 'src/app/dtos/UserDTO/UserGetDTO';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

  
})
export class NavComponent   implements OnInit {


  private langChangeSubscription: Subscription;

  logg: boolean = localStorage.getItem('isLoggedIn') === 'true';
  userIda =localStorage.getItem('UserId');
  ida=parseInt(this.userIda!);
  input:UserByIdDto=new UserByIdDto();
  
  isDarkMode:boolean=false;

 count:number=0;

  constructor( private cdr: ChangeDetectorRef,private dateAdapter: DateAdapter<any>,private translate: TranslateService,public backend:MainService,private toastr:ToastrService,public spinner:NgxSpinnerService,private router:Router,private darkModeService: DarkModeService) {

    
  

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));

    this.setDateLocale(this.translate.currentLang);

    // Subscribe to language changes
    this.langChangeSubscription = this.translate.onLangChange.subscribe(event => {
      this.setDateLocale(event.lang);
    });


  }




  ngOnInit(){
    
    this.input.imageProfile ="https://www.shutterstock.com/image-vector/concept-blogging-golden-blog-word-260nw-755744683.jpg";
    
  
  
  }


logout(){

  this.spinner.show()
  this.backend.Logout().subscribe(data=>{

    this.spinner.hide()
    localStorage.setItem('isLoggedIn','false');

    this.logg=false;
    
    localStorage.removeItem('token');
    localStorage.removeItem('EmailUser');
    localStorage.removeItem('UserId');
    localStorage.removeItem('UserType');
    localStorage.removeItem('Email');
    
    this.router.navigate(['/Login']);

  },err=>{
    this.spinner.hide()
    this.toastr.error('Failed Logon');
  });;

  
}


navigateToAboutUs(event: Event) {
  event.preventDefault();
  if (this.router.url === '/') {

    document.getElementById('About')?.scrollIntoView({

      block: 'start',
      inline: 'nearest'
    });
  } else {

    this.router.navigate(['/']).then(() => {
      document.getElementById('About')?.scrollIntoView({

        block: 'start',
        inline: 'nearest'
      });
    });
  }
}


navigateToHome(event: Event) {
  event.preventDefault();

    this.router.navigate(['/']).then(() => {
      document.getElementById('Home')?.scrollIntoView({

        block: 'start',
        inline: 'nearest'
      });
    });
  
}
navigateToOrder(event: Event) {
  event.preventDefault();

    this.router.navigate(['/OrderById']).then(() => {
      document.getElementById('Order')?.scrollIntoView({

        block: 'start',
        inline: 'nearest'
      });
    });
  
}

navigateToCatory(event: Event) {
  event.preventDefault();

    this.router.navigate(['/Catagori']).then(() => {
      document.getElementById('Catagoris')?.scrollIntoView({
        block: 'start',
        inline: 'nearest'
      });
    });
  
}
navigateToProblem(event: Event) {
  event.preventDefault();
    this.router.navigate(['/Problem']).then(() => {
      document.getElementById('Problem')?.scrollIntoView({
        block: 'start',
        inline: 'nearest'
      });
    });
  
}
navigateToUser(event: Event) {
  event.preventDefault();
   
    this.router.navigate(['/UpdateUser']).then(() => {
      document.getElementById('UpdateUser')?.scrollIntoView({
        block: 'start',
        inline: 'nearest'
      });
    });
  
}

ngAfterViewInit(){
  this.spinner.show()
  if(this.ida !=undefined){
    this.backend.GetUserDetails(this.ida).subscribe(aa=>{

      this.spinner.hide()
      this.input=aa;
     

    },err=>{
      this.spinner.hide()
      console.log(err);
   

    });
  }else{


  }


 

}



  changeLanguage() {
    const newLang = this.translate.currentLang === 'ar' ? 'en' : 'ar';
    this.translate.use(newLang);
    localStorage.setItem("language", newLang);
    this.cdr.detectChanges();
  }

 
  private setDateLocale(lang: string) {
    // Set the locale for the date picker based on the current language
    this.dateAdapter.setLocale(lang);
  }
  ngOnDestroy() {
    // Unsubscribe from the language change subscription when the component is destroyed
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  clickDark(){
    this.isDarkMode=!this.isDarkMode;
    localStorage.setItem("isDarkMode",`${this.isDarkMode}`);
    this.darkModeService.toggleDarkMode();
  }




}
































/*
changeLanguage2(value :string){
  this.spinner.show()
  
  if(value !='ar'){
    localStorage.removeItem("language");
   
    this.translate.use("ar");
    localStorage.setItem("language","ar");
    
 
    console.log("c1",localStorage.getItem("language"));
    this.spinner.hide();
   
  }else{
    localStorage.removeItem("language");
    localStorage.setItem("language","en");
    this.translate.use("en");
    console.log("c2",localStorage.getItem("language"));
    
   
  }
  this.cdr.detectChanges(); 
  this.spinner.hide();

}
*/