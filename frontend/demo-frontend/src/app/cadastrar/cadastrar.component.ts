import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServicoService } from '../servico/servico.service';
import { Jsonp } from '@angular/http/src/http';
import { PessoaComponent } from '../pessoa/pessoa.component';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  constructor(private pessoaService: ServicoService,
    private activatedRoute: ActivatedRoute,
    private route: Router) { }

  @Input() id: string;

  pessoa = {};

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        if (params.id != null) {
          this.editarPessoa(params.id);
        }
      }
    );
  }

  salvarPessoa() {
    this.pessoaService.salvarPessoa(this.pessoa).subscribe(() => {
      this.pessoa = {};
      this.route.navigate(['/listar']);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Aconteceu um erro: ', err.error.message);
        } else {
          console.log(`O codigo retornado é ${err.status}, body was: ${err.error}`)
          this.pessoa = {};
        }
      }
    );
  }

  editarPessoa(id) {
    this.pessoaService.buscarPessoa(id).subscribe(pessoa => {
      this.pessoa = pessoa;
    })
  }
}
