import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TokenService } from './token.service';
import { User} from '@models/user.model';
import { checktoken } from '@interceptors/token.interceptor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private API_URL = environment.API_URL;
    constructor( private httpCliente:HttpClient, private tokenService:TokenService) { }


  getUsers(){
    const token = this.tokenService.getToken();
    return this.httpCliente.get<User[]>(`${this.API_URL}/api/v1/users`, {context: checktoken()}
    )
  }



}
