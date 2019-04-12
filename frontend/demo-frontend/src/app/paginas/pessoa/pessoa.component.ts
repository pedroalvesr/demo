import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NgProgress } from 'ngx-progressbar';

import { MensagemService } from './../../componentes/mensagem/mensagem.service';
import { ServicoService } from './../../servicos/servico.service';
import { LoginService } from '../../servicos/login.service';
import { MASKS } from 'ng-brazil';


declare var $;

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  public MASKS = MASKS;
  public formFields;
  public form;

  pessoas = [];
  pessoa: any;
  pagina: number = 0;
  qtdPorPagina: number = 10;
  qtdPaginas: number;
  totalRegistro;
  filtro;

  static atualizacao = new EventEmitter<any>();

  constructor(
    private pessoaService: ServicoService,
    private mensagemService: MensagemService,
    public ngProgress: NgProgress,
    private loginService: LoginService
    ) {
  }

  ngOnInit() {
    this.mostarPessoas();
  }


  mostarPessoas() {
      this.ngProgress.start();
      this.pessoaService.listarPessoas().subscribe((p) => {
        this.pessoas = p;        
        this.ngProgress.done();
      },
      error => console.log(`Erro: ` + error.error.message));
  }

  paginar($event: any) {
    this.pagina = $event - 1;
    this.qtdPaginas = Math.ceil(this.pessoas.length / this.qtdPorPagina);
    this.popularPessoas(this.pessoas);
    PessoaComponent.atualizacao.emit(this.qtdPaginas);
  }

  popularPessoas(filtro) {
    this.pessoa = [];
    for (let i = (this.pagina * this.qtdPorPagina); i < (this.pagina * this.qtdPorPagina + (+this.qtdPorPagina)); i++) {
      if (i >= filtro.length) {
        break;
      }
      this.pessoa.push(filtro[i]);
    }
    this.totalRegistro = filtro.length;
    this.qtdPaginas = Math.ceil(filtro.length / this.qtdPorPagina);
    PessoaComponent.atualizacao.emit(this.qtdPaginas);
    return this.pessoa;
  }


  excluirPessoa(pessoa) {
    this.pessoaService.deletarPessoa(pessoa.id).subscribe(() => {
      this.mostarPessoas();
      this.sucesso(`O usuário ${pessoa.nome} foi apagado de nossa base de dados!`);
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log('Aconteceu um erro: ', err.error.message);
      } else {
        this.mostarPessoas();
        console.log(`O codigo retornado é ${err.status}, body was: ${err.error}`)
      }
    }
    );
  }

  deslogar() {
    this.loginService.logout();
  }

  editarPessoa(pessoa) {
    this.pessoaService.emitirPessoa(pessoa);
  }

  sucesso(message: string) {
    this.mensagemService.sucesso(message);
    this.loading(3000)
  }

  erro(message: string) {
    this.mensagemService.erro(message);
  }

  info(message: string) {
    this.mensagemService.info(message);
  }

  alerta(message: string) {
    this.mensagemService.alerta(message);
  }

  limparMensagem() {
    this.mensagemService.limparMensagem();
  }

  loading(time) {
    setTimeout(() => {
      this.limparMensagem();
    }, time);
  }

}
