import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { UserByIdDto } from 'src/app/dtos/UserDTO/UserGetDTO';
import { UpdateUserDto } from 'src/app/dtos/UserDTO/UserUpdateDTO';






@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],


})
export class UpdateUserComponent implements OnInit {

  attachements: File | undefined;

  input: UpdateUserDto = new UpdateUserDto();

  input2: UserByIdDto = new UserByIdDto();

  islogin: boolean = true;
  isDarkMode: boolean = false;
  language: string | null = null;
  genders: { value: number, viewValue: string }[] = [];

  constructor(private translate: TranslateService, private darkModeService: DarkModeService, private router: Router, public backend: MainService, private toastr: ToastrService, public spinner: NgxSpinnerService) {


    this.translate.onLangChange.subscribe(() => {
      this.loadTranslations();
    });


    this.loadTranslations();
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






  ngOnInit() {

    this.language = localStorage.getItem('language');
    this.input2.imageProfile = "https://www.shutterstock.com/image-vector/concept-blogging-golden-blog-word-260nw-755744683.jpg";

    this.input.UserId = parseInt(localStorage.getItem('UserId')!);
    

    this.backend.GetUserDetails(this.input.UserId!).subscribe(aa => {

      this.spinner.hide()
      this.input2 = aa;



    }, err => {
      this.spinner.hide()
      console.log(err);
      this.toastr.error(this.translate.instant('toastor.UpdateUser.Not'));
      this.islogin = false;

    });

    this.translate.onLangChange.subscribe(() => {
      // React to language change if needed
      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });

  }



  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.attachements = event.target.files[0];


      this.spinner.show();
      this.backend.UploadImageUserProfileAndGetURL(this.attachements!).pipe(
        switchMap((res: string) => {

          this.input.imageProfile = res;

          return this.backend.UpdateUser(this.input).pipe(switchMap((res: string) => {

            return this.backend.GetUserDetails(this.input2.userId!).pipe(switchMap((data3: any) => {
              this.spinner.hide();

              this.input2 = data3;

              return EMPTY;
            }),
              catchError((err) => {
                this.spinner.hide();
                this.toastr.error(this.translate.instant('toastor.UpdateUser.Faild'));
                return EMPTY;
              })

            );

          }));

        })).subscribe(
          src => {
            this.spinner.hide();
            this.toastr.success(this.translate.instant('toastor.UpdateUser.Updatedimage2'));

          },
          err => {
            this.spinner.hide();
            this.toastr.error(this.translate.instant('toastor.UpdateUser.failed'));
          }
        );

    }




  }



  EiditeUser(event: Event) {
    event.preventDefault()

    this.input.FirstName = this.input2.firstName;
    this.input.LastName = this.input2.lastName;
    this.input.Gender = this.input2.gender;
    this.input.imageProfile = this.input2.imageProfile;
    this.input.Phone = this.input2.phone;
    this.input.Email = this.input2.email;
    this.input.BirthDate = this.input2.birthDate;

    this.spinner.show();
    this.backend.UpdateUser(this.input).subscribe(src => {
      this.spinner.hide();
      this.toastr.success(this.translate.instant('toastor.ServiceAll.UpdatedUser'));


    }, err => {

      this.spinner.hide();
      this.toastr.error(this.translate.instant('toastor.ServiceAll.Failed'));
    })








  }


  OGhome() {

    this.router.navigate(['/']);

  }







}


























/*

   return   this.backend.GetUserDetails(this.input2.userId!).pipe(switchMap((data3:any)=>{
          this.spinner.hide();
          
          this.input3=data3;

          console.log('imageprofile',this.input3.imageProfile);
          this.router.navigate(['/Main']);
          return EMPTY;
        }),
        catchError((err) => {
          this.spinner.hide();
          this.toastr.error('Faild GetUserDetails');
          return EMPTY; // Return EMPTY to ensure the function returns an Observable
        })
      
      );*/