
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { categoryAllDto } from '../dtos/Category/CategoryAllDto/CategoryAllDto';
import { LoginDto } from '../dtos/LoginDTO/LoginDTO';
import { CreateUserDto } from '../dtos/UserDTO/UserCreateDTO';
import { GetServiceAllDto } from '../dtos/ServiceDto/ServiceDtoAll';
import { ResetPasswordsDto } from '../dtos/LoginDTO/ResetPaswwordDTO';
import { CreateProblemAllDto } from '../dtos/ProblemDTO/ProblemDTo';
import { UpdateUserDto } from '../dtos/UserDTO/UserUpdateDTO';
import { UserByIdDto } from '../dtos/UserDTO/UserGetDTO';
import { serviceGetByIdDto } from '../dtos/ServiceDto/ServiceByIdDTO';
import { CreateOrderDto } from '../dtos/OrderDTO/CreateOrderDTO';
import { GetOrderByIdDto} from '../dtos/OrderDTO/GetOrderByIdDTO';
import { orderGetAllDto } from '../dtos/OrderDTO/GetAllOrderDTO';
import {RatingDTO } from '../dtos/CongirmDialog/CongirmDialog';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseURL:string='https://localhost:44305';

 
  constructor(private http:HttpClient) { 


  }

  GetCategoryAll():Observable<categoryAllDto[]>{


    return this.http.get<categoryAllDto[]>(`${this.baseURL}/GetCategoryAll`);
      
  }







  GetOrderAll(): Observable<orderGetAllDto[]> {

    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
      'token': `${localStorage.getItem('token') }`
    });
  

    return this.http.get<orderGetAllDto[]>(`${this.baseURL}/api/client/GetAllOrderUser`, { headers });



}



//1
GetServiceUserAll(categorId:number|undefined): Observable<GetServiceAllDto[]> {
const headers = new HttpHeaders({
  'Accept': 'text/plain', 
  
});

return this.http.get<GetServiceAllDto[]>(`${this.baseURL}/api/client/GetServiceCustomerAll/${categorId}`, { headers });
}
//2

GetServiceDetails(ServiceId:number): Observable<serviceGetByIdDto> {
  const headers = new HttpHeaders({
    'Accept': 'text/plain', 
  
  });

  return this.http.get<serviceGetByIdDto>(`${this.baseURL}/GetServiceById/${ServiceId}`, { headers });
}







GetOrderDetails(OrderId:number): Observable<GetOrderByIdDto> {
  const headers = new HttpHeaders({
    'Accept': 'text/plain', 
  
  });

  return this.http.get<GetOrderByIdDto>(`${this.baseURL}/GetOrderById/${OrderId}`, { headers });
}





GetUserDetails(UserId:number): Observable<UserByIdDto> {
  const headers = new HttpHeaders({
    'Accept': 'text/plain', 
  //  'token': `${this.token}`
  });

  return this.http.get<UserByIdDto>(`${this.baseURL}/GetUserById/${UserId}`, { headers });
}



//1

CreateProblem(input:CreateProblemAllDto) : Observable<any>{
  const headers = new HttpHeaders({
   'Accept': 'text/plain', 
   'token': `${localStorage.getItem('token') }`
  
  });


  return this.http.post(`${this.baseURL}/api/client/CreateProblem`,input,{headers,responseType: 'text' as 'json' } );

}



CreateOrder(input: CreateOrderDto): Observable<number> {
  const headers = new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'application/json',
    'token': `${localStorage.getItem('token')}`,
  });

  return this.http.post<number>(`${this.baseURL}/api/client/CreateOrder/${input.serviceId}`, input, { headers, responseType: 'text' as 'json' })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        // Check for specific error messages
        if (error.error.includes('IDX12741')) {
          // Message for the JWT error
          errorMessage = 'There is an issue with the token sent. Please check the token.';
        } else if (error.error.includes('Object reference not set to an instance of an object')) {
          // Message for the null reference error
          errorMessage = 'There is an issue with the data sent. Please ensure the data is correct.';
        } else {
          // General error message
          errorMessage = 'An unexpected error occurred. Please try again later.';
        }

        // Log or display the error message
        console.error(errorMessage);

        // Throw the error again if needed
        return throwError(() => new Error(errorMessage));
      })
    );
}



UpdateUser(input:UpdateUserDto) : Observable<any>{
  const headers = new HttpHeaders({
   'Accept': 'text/plain', 
   'token': `${localStorage.getItem('token') }`
  
  });


  return this.http.put(`${this.baseURL}/UpdateUser`,input,{headers,responseType: 'text' as 'json' } );

}

UpdateRating(input:RatingDTO) : Observable<any>{
  const headers = new HttpHeaders({
   'Accept': 'text/plain', 
  // 'token': `${localStorage.getItem('token') }`
  
  });


  return this.http.put(`${this.baseURL}/api/client/Rating`,input,{headers,responseType: 'text' as 'json' } );

}

UploadImageServicesProfileAndGetURL(file: File) : Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);

  const headers = new HttpHeaders({
    'Accept': 'text/plain'
  });
  return this.http.post(`${this.baseURL}/UploadImageServicesProfileAndGetURL`, formData, { headers, responseType: 'text' as 'json' })
}


UploadImageUserProfileAndGetURL(file: File) : Observable<any> {
  const formData: FormData = new FormData();
  formData.append('file', file, file.name);

  const headers = new HttpHeaders({
    'Accept': 'text/plain'
  });
  return this.http.post(`${this.baseURL}/UploadImageUserProfileAndGetURL`, formData, { headers, responseType: 'text' as 'json' })
}





Register(input:CreateUserDto): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'text/plain'
  });
  return this.http.post(`${this.baseURL}/CreateUser`,input, { headers , responseType: 'text' as 'json' })
}



  Login(input:LoginDto):Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    });

    return this.http.post(`${this.baseURL}/api/client/LoginbyUser`,input,{ headers , responseType: 'text' as 'json' })


  }

  

  ResetPassword(input:ResetPasswordsDto) : Observable<any>{
    const headers = new HttpHeaders({
     'Accept': 'text/plain', 
     
    
    });


    return this.http.put(`${this.baseURL}/ResetPassword`,input,{headers,responseType: 'text' as 'json' } );

  }


  Logout():Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain', 
    });
   
    
    localStorage.setItem('isLoggedIn','false');
    localStorage.removeItem('token');
   

    return this.http.put(`${this.baseURL}/Logout/${parseInt(localStorage.getItem('UserId')!)}`, parseInt(localStorage.getItem('UserId')!),{ headers , responseType: 'text' as 'json' });
    

  }

 
 






}
