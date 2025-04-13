import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { tap } from 'rxjs/operators';
import { ResponseLogin } from '@models/auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private API_URL = environment.API_URL;
  constructor( private httpCliente:HttpClient, private tokenService:TokenService) { }

  login(email: string, password: string) {
    // Simulate a login check
    return this.httpCliente.post<ResponseLogin>(`${this.API_URL}/api/v1/auth/login`,{
      email,
      password
    }).pipe(
      tap( resp => {
          this.tokenService.saveToken( resp.access_token )
      } )
    )
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


  logout(){
    this.tokenService.removeToken();
  }


}
