import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router/src/directives/router_link';
import { Router } from '@angular/router';

import { NgProgress } from 'ngx-progressbar';

import { ServicoService } from './../servico/servico.service';
import { MensagemService } from '../mensagem/mensagem.service';


declare var $;

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoas = [
    // {nome: 'José Mario', nascimento: '1992-12-28', cpf: '254.432.234-12'},
    // {nome: 'Antonio', nascimento: '1992-12-28', cpf: '254.432.234-12'},
    // {nome: 'Caros', nascimento: '1992-12-28', cpf: '254.432.234-12'},
    // {nome: 'Maria', nascimento: '1992-12-28', cpf: '254.432.234-12'},
    // {nome: 'Roberto', nascimento: '1992-12-28', cpf: '254.432.234-12'},
    // {nome: 'Regis', nascimento: '1992-12-28', cpf: '254.432.234-12'}
  ];
  pessoa: any;
  pagina: number = 0;
  qtdPorPagina: number = 10;
  qtdPaginas: number;
  totalRegistro;

  static atualizacao = new EventEmitter<any>();

  constructor(private pessoaService: ServicoService,
    private route: Router,
    private mensagemService: MensagemService,
    public ngProgress: NgProgress) { }

  ngOnInit() {
    this.mostarPessoas();
    // this.popularPessoas();  
  }


  mostarPessoas() {
    this.ngProgress.start();
    this.pessoaService.listarPessoas().subscribe(p => {
      this.pessoas = p;
      this.ngProgress.done();
      this.popularPessoas(this.pessoas);
    });
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
    console.log(`chamou!`);
    setTimeout(() => {
      this.limparMensagem();
      console.log(`chamou!`);
    }, time);

  }

}
