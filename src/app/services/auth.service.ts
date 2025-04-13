import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private API_URL = environment.API_URL;
  constructor( private httpCliente:HttpClient ) { }

  login(email: string, password: string) {
    // Simulate a login check
    return this.httpCliente.post(`${this.API_URL}/api/v1/auth/login`,{
      email,
      password
    })
  }

  regiter(email: string, password: string,name:string){
    return this.httpCliente.post(`${this.API_URL}/api/v1/auth/register`,{
      email,
      password,
      name
    })
  }

  isAvailable(email: string){
    return this.httpCliente.post<{isAvailable:boolean}>(`${this.API_URL}/api/v1/auth/is-available`,{
      email,
    })
  }

  recovery(email:string){
    return this.httpCliente.post<{isAvailable:boolean}>(`${this.API_URL}/api/v1/auth/recovery`,{
      email,
    })
  }

  changePassword(newPassword:string,token:string){
    return this.httpCliente.post<{isAvailable:boolean}>(`${this.API_URL}/api/v1/auth/change-password`,{
      token,
      newPassword
    })
  }


}
