import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgProgress } from 'ngx-progressbar';
import 'rxjs/add/operator/map';

import { Pessoa } from './../model/pessoa';
import { DEMO_API, DEMO_PESSOA_API } from './../app.api';

@Injectable()
export class ServicoService {

  pessoa: Pessoa;

  static emitterPessoa = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    public ngProgress: NgProgress
    ) { }

  listarPessoas(): Observable<any> {
    return this.http.get(`${DEMO_API}/${DEMO_PESSOA_API}`);
  }

  salvarPessoa(pessoa) {
    return this.http.post(`${DEMO_API}/${DEMO_PESSOA_API}`, pessoa);
  }

  deletarPessoa(parametro) {
    return this.http.delete(`${DEMO_API}/${DEMO_PESSOA_API}/${parametro}`);
  }

  buscarPessoa(parametro) {
    return this.http.get(`${DEMO_API}/${DEMO_PESSOA_API}/${parametro}`);
  };

  emitirPessoa(pessoa) {
    ServicoService.emitterPessoa.emit(pessoa);
  }

  getPessoa() {
    return this.pessoa;
  }

  novaPessoa(pessoa: Pessoa){
    this.salvarPessoa(pessoa).subscribe((p: Pessoa) => {
      this.pessoa = p;
    },
    error => console.log(error.error.message));
  }

}
