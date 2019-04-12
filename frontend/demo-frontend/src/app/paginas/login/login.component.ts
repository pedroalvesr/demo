import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../../servicos/login.service';
import { Usuario } from './../../model/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  navigateTo: String;

  constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    ) { 
    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/';
  }

  login(){    
    this.loginService.login(this.usuario).subscribe(() => {
      this.route.navigate(['/listar']);
    })
  }

}
