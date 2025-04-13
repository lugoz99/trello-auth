import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
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

  isValidToken(){
    const token = getCookie("token-trello");
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>( token );
    if( decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }

    return false;

  }


  saveRefreshToken(token: string): void {
    //localStorage.setItem("token", token);
    // para todas las rutas de la aplicacion, 1 año se expirta
    setCookie('refresh-token-trello',token, { expires : 365, path:'/'})
  }

  getRefreshToken() {
    //return localStorage.getItem("token");
    const token = getCookie("refresh-token-trello");
    return token;
  }

  removeRefreshToken(): void {
    //localStorage.removeItem("token");
    removeCookie("refresh-token-trello");
  }



  isValidRefreshtoken(){
    const token = this.getRefreshToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>( token );
    if( decodeToken && decodeToken?.exp){
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }

    return false;

  }


}
