import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './base-component/app.component';
import { FooterComponent } from './shared-copmonent/footer/footer.component';
import { NavComponent } from './shared-copmonent/nav/nav.component';
import { MainComponent } from './pages/main/main.component';
import { GetAllGategoryeComponent } from './pages/get-all-gategorye/get-all-gategorye.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GetServiceByIdComponent } from './pages/get-service-by-id/get-service-by-id.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ErrorComponent } from './pages/error/error.component';
import { OrderByIdApprovedComponent } from './pages/order-by-id-approved/order-by-id-approved.component';
import { ServiceAllComponent } from './pages/service-all/service-all.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingComponent } from './pages/rating/rating.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RatingModule } from 'primeng/rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http'





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    MainComponent,
    GetAllGategoryeComponent,
    LoginComponent,
    CreateAccountComponent,
    ForgetPasswordComponent,
    GetServiceByIdComponent,
    CreateOrderComponent,
    ConfirmationComponent,
    ErrorComponent,
    OrderByIdApprovedComponent,
    ServiceAllComponent,
    UpdateUserComponent,
    ProblemComponent,
    RatingComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    MatIconModule,
    ButtonModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    NgbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage:localStorage.getItem("language")??'en' ,
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
    
    
    
    
    
    
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

