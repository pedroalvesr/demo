import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Usuario } from '../model/usuario';
import { DEMO_API } from '../app.api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usuario: Usuario;
  usuarioAutenticado: boolean = false;
  token: String;

  constructor(
    private http: HttpClient,
    private route: Router
  ) { }

  login(usuario): Observable<any> {
    
    return this.http.post(`${DEMO_API}/login`, usuario,  { observe: 'response' }).do((response) => {
      const accessToken = response.headers.get('Authorization').split(' ')[1];
      this.usuarioAutenticado = true;
      localStorage.setItem("token", accessToken);
    });
  }

  loadAcessToken() {
    if (this.token === undefined || this.token === null) {
      const accessToken = localStorage.getItem("token");
      if (accessToken != undefined && accessToken != null) {
        return true;
      }
      
      return false;
    }
    return true;
  }

  isLogado() {
    return this.loadAcessToken();
  }

  logout(){
    localStorage.removeItem("token");
    this.route.navigate(["/login"]);
  }

  getToken(){
    return localStorage.getItem("token");
  }

}
