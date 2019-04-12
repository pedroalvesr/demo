import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class ServicoService {

  pessoa = {};

  urlListarPessoas = 'http://localhost:8080/pesquisa';
  urlSalvarPessoa =  'http://localhost:8080/salvar';
  urlExcluirPessoa = 'http://localhost:8080/apagar/';
  urlBuscarPessoa =  'http://localhost:8080/pesquisa/';

  static emitterPessoa = new EventEmitter<any>();

  constructor(private http: HttpClient) { }
    
  listarPessoas(): Observable<any>{
    return this.http.get(this.urlListarPessoas);
  }

  salvarPessoa(pessoa){
    return this.http.post(this.urlSalvarPessoa, pessoa);
  }

  deletarPessoa(id){
    return this.http.delete(this.urlExcluirPessoa + id);
  }

  buscarPessoa(id){
    return this.http.get(this.urlBuscarPessoa + id);
  };

  emitirPessoa(pessoa){
    ServicoService.emitterPessoa.emit(pessoa);
  }

}
