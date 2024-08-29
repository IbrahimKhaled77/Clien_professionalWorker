import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { GetAllGategoryeComponent } from './pages/get-all-gategorye/get-all-gategorye.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { GetServiceByIdComponent } from './pages/get-service-by-id/get-service-by-id.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ErrorComponent } from './pages/error/error.component';
import { OrderByIdApprovedComponent } from './pages/order-by-id-approved/order-by-id-approved.component';
import { ServiceAllComponent } from './pages/service-all/service-all.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { ProblemComponent } from './pages/problem/problem.component';
import { RatingComponent } from './pages/rating/rating.component';




const routes: Routes = [

  { 

    path:'',
    component:MainComponent,

  },
  
  { 

    path:'Main',
    component:MainComponent,

  },
  { 

    path:'Catagori',
    component:GetAllGategoryeComponent,

  },

  { 

    path:'ServiceById/:ServiceId',
    component:GetServiceByIdComponent,

  },
  { 

    path:'CreateOrder/:ServiceId',
    component:CreateOrderComponent,

  },
  { 

    path:'Confirmation/:orderId',
    component:ConfirmationComponent,

  },

  { 

    path:'OrderById',
    component:OrderByIdApprovedComponent,

  },
  { 
  
    path:'ServiceAll/:categorId',
    component:ServiceAllComponent,

  },
  { 

    path:'UpdateUser',
    component:UpdateUserComponent,

  },
  { 

    path:'Problem',
    component:ProblemComponent,

  },
  { 

    path:'Login',
    component:LoginComponent,

  },
  { 

    path:'singup',
    component:CreateAccountComponent,

  },
  { 

    path:'ForgetPassword',
    component:ForgetPasswordComponent,

  },
  { 

    path:'Rating',
    component:RatingComponent,

  },

  { 

    path:'error',
    component:ErrorComponent ,

  },
  { 

    path:'**',
    component:ErrorComponent ,

  },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
