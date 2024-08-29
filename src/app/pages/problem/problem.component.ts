import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { DarkModeService } from 'src/app/backend/services/dark-mode.service';
import { CreateProblemAllDto } from 'src/app/dtos/ProblemDTO/ProblemDTo';


@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent {

  input: CreateProblemAllDto = new CreateProblemAllDto();
  isDarkMode: boolean = false;
  language: string | null = null;

  constructor(private translate: TranslateService, private darkModeService: DarkModeService,public backend: MainService, private toastr: ToastrService, public spinner: NgxSpinnerService) {

    this.darkModeService.isDarkMode$.subscribe((mode) => (this.isDarkMode = mode));
  }



  ngOnInit() {

    this.language = localStorage.getItem('language');

    this.translate.onLangChange.subscribe(() => {

      this.language = this.translate.currentLang;
      localStorage.setItem('language', this.language);
    });


  } 
  CreateProblem() {
    if (this.input.title == undefined || this.input.title == '') {
      this.toastr.warning(this.translate.instant('toastor.Problem.title'))
      return;
    }



    this.input.userId = parseInt(localStorage.getItem('UserId')!);
    this.spinner.show()
    this.backend.CreateProblem(this.input).subscribe(res => {
      this.spinner.hide()
      this.input = res;
      this.toastr.success(this.translate.instant('toastor.Problem.submitting'))
    }, err => {
      this.spinner.hide()
      this.toastr.error(this.translate.instant('toastor.Problem.Please'))

    })
  }




}




