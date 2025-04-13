import { Injectable } from '@angular/core';
import { getCookie , setCookie, removeCookie } from 'typescript-cookie'
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string): void {
    //localStorage.setItem("token", token);
    // para todas las rutas de la aplicacion, 1 año se expirta
    setCookie('token-trello',token, { expires : 365, path:'/'})
  }

  getToken() {
    //return localStorage.getItem("token");
    const token = getCookie("token-trello");
    return token;
  }

  removeToken(): void {
    //localStorage.removeItem("token");
    removeCookie("token-trello");
  }
}
