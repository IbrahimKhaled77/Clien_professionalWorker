import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { LoginDto } from 'src/app/dtos/LoginDTO/LoginDTO';
import { CreateUserDto } from 'src/app/dtos/UserDTO/UserCreateDTO';
import { jwtDecode } from 'jwt-decode';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { UserByIdDto } from 'src/app/dtos/UserDTO/UserGetDTO';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  input: CreateUserDto = new CreateUserDto();

  input2: LoginDto = new LoginDto();

  input3: UserByIdDto = new UserByIdDto();

  attachement: File | undefined;


  genders: { value: number, viewValue: string }[] = [];
  isDarkMode: boolean = false;


  constructor(private translate: TranslateService, private darkModeService: DarkModeService, private router: Router, public backend: MainService, private toastr: ToastrService, public spinner: NgxSpinnerService) {


    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));


    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });


    this.loadTranslations();

  }


  ngOnInit() {
    this.input3.imageProfile = "https://www.shutterstock.com/image-vector/concept-blogging-golden-blog-word-260nw-755744683.jpg";

  }



  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.attachement = event.target.files[0];
    }
  }
 

  CreateNewAccount(event: Event) {
    event.preventDefault()
    if (this.input.FirstName == undefined || this.input.FirstName == '') {
      this.toastr.warning(this.translate.instant('toastor.CreateAccount.firstName'))
      return;
    }
    if (this.input.Password == undefined || this.input.Password == '') {
      this.toastr.warning(this.translate.instant('toastor.CreateAccount.Password'))
      return;
    }
    if (this.input.Email == undefined || this.input.Email == '') {
      this.toastr.warning(this.translate.instant('toastor.CreateAccount.Email'))
      return;
    }
    if (this.input.Phone == undefined) {
      this.toastr.warning(this.translate.instant('toastor.CreateAccount.Phone'))
      return;
    }
    if (this.input.LastName == undefined || this.input.LastName == '') {
      this.toastr.warning(this.translate.instant('toastor.CreateAccount.LastName'))
      return;
    }
    if (this.input.BirthDate == undefined) {
      this.toastr.warning(this.translate.instant('toastor.CreateAccount.BirthDate'))
      return;
    }
    if (this.input.Gender == undefined) {
      this.toastr.warning(this.translate.instant('toastor.CreateAccount.Gender'))
      return;
    }
    this.input.UserType = 3;
    this.input.imageProfile = '';


    this.spinner.show()

    this.backend.UploadImageUserProfileAndGetURL(this.attachement!).pipe(
      switchMap((res: string) => {
        this.input.imageProfile = res;

        // Ensure that the function returns an Observable
        return this.backend.Register(this.input).pipe(
          switchMap(() => {
            this.spinner.hide();
            this.input2.UserName = this.input.Email;
            this.input2.Password = this.input.Password;

            // Ensure that the function returns an Observable
            return this.backend.Login(this.input2).pipe(
              switchMap((data2: any) => {
                this.spinner.hide();
      
                if (!data2) {
                  this.toastr.error(this.translate.instant('toastor.CreateAccount.token'));
                  return EMPTY; // Return EMPTY to ensure the function returns an Observable
                }

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('token', data2);

                let decodedToken: any;
                try {
                  decodedToken = jwtDecode(data2);
                } catch (error) {
                  this.toastr.error(this.translate.instant('toastor.CreateAccount.Invalidtoken'));
                  return EMPTY; // Return EMPTY to ensure the function returns an Observable
                }

                localStorage.setItem('UserId', decodedToken.UserId);
                localStorage.setItem('Email', decodedToken.Email);
                localStorage.setItem('UserType', decodedToken.UserType);

              


                return this.backend.GetUserDetails(decodedToken.UserId).pipe(switchMap((data3: any) => {
                  this.spinner.hide();

                  this.input3 = data3;
                  return EMPTY;
                }),
                  catchError((err) => {
                    this.spinner.hide();
                    this.toastr.error(this.translate.instant('toastor.CreateAccount.Found'));
                    return EMPTY;
                  })

                );

              }),
              catchError((err) => {
                this.spinner.hide();
                this.toastr.error(this.translate.instant('toastor.CreateAccount.Wrong'));
                return EMPTY;
              })
            );
          }),
          catchError((err) => {
            this.spinner.hide();
            this.toastr.error(this.translate.instant('toastor.CreateAccount.FailedCreate'));
            return EMPTY;
          })
        );
      })
    ).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success(this.translate.instant('toastor.CreateAccount.Created'));
        this.toastr.success(this.translate.instant('toastor.CreateAccount.Login'));
        this.router.navigate(['/']);
      },
      err => {
        this.spinner.hide();
        this.toastr.error(this.translate.instant('toastor.CreateAccount.Failed'));
      }
    );
  }


  loadTranslations() {
    this.translate.get(['gendear.Male', 'gendear.Female']).subscribe(translations => {
      this.genders = [
        { value: 1, viewValue: translations['gendear.Male'] },
        { value: 2, viewValue: translations['gendear.Female'] }
      ];
    });

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }



}




















/*

this.input2.UserName=this.input.email;
this.input2.Password=this.input.password;

this.backend.Login(this.input2).subscribe(data => {
  this.spinner.hide();
  this.toastr.success('Login success');
  if (!data) {
    this.toastr.error('Login failed. No token received.');
    return;
  }
  
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('token', data);

  let decodedToken: any;
  try {
    decodedToken = jwtDecode(data);
  } catch (error) {
    this.toastr.error('Invalid token.');
    return;
  }

  localStorage.setItem('UserId', decodedToken.UserId);
  localStorage.setItem('Email', decodedToken.Email);
  localStorage.setItem('UserType', decodedToken.UserType);
  
  this.toastr.success('Login success');
  this.router.navigate(['/Main']);
}, err => {
  this.spinner.hide();
  this.toastr.error('Wrong username or password');
});*/


/*
    this.backend.Register(this.input).subscribe(res=>{
      this.spinner.hide()
      this.toastr.success('New Account has been Created')
      this.input2.UserName=this.input.Email;
      this.input2.Password=this.input.Password;

  this.backend.Login(this.input2).subscribe(data => {
  this.spinner.hide();
  this.toastr.success('Login success');
  if (!data) {
    this.toastr.error('Login failed. No token received.');
    return;
  }
  
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('token', data);

  let decodedToken: any;
  try {
    decodedToken = jwtDecode(data);
  } catch (error) {
    this.toastr.error('Invalid token.');
    return;
  }

  localStorage.setItem('UserId', decodedToken.UserId);
  localStorage.setItem('Email', decodedToken.Email);
  localStorage.setItem('UserType', decodedToken.UserType);
  
  this.toastr.success('Login success');
  this.router.navigate(['/Main']);
}, err => {
  this.spinner.hide();
  this.toastr.error('Wrong username or password');
});
     
      this.router.navigate(['/'])
    },err=>{
      this.spinner.hide()
      this.toastr.error('Failed To Create Account')
    })*/