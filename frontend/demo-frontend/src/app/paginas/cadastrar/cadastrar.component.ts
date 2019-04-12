import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MASKS } from 'ng-brazil';
import { Pessoa } from './../../model/pessoa';
import { ServicoService } from './../../servicos/servico.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  public MASKS = MASKS;
  public formFields;
  public form;


  constructor(private pessoaService: ServicoService,
    private activatedRoute: ActivatedRoute,
    private route: Router
    ) { 
      this.pessoa = new Pessoa();
    }

  @Input() id: string;

  pessoa: Pessoa;

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
    this.pessoa.cpf = this.pessoa.cpf.replace(/\D/g, '');
    this.pessoaService.salvarPessoa(this.pessoa).subscribe(() => {
      this.pessoa = new Pessoa();
      this.route.navigate(['/listar']);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Aconteceu um erro: ', err.error.message);
        } else {
          console.log(`O codigo retornado é ${err.status}, body was: ${err.error}`)
          this.pessoa = new Pessoa();
        }
      }
    );
  }

  editarPessoa(id) {
    this.pessoaService.buscarPessoa(id).subscribe((pessoa: Pessoa) => {
      this.pessoa = pessoa;
    })
  }
}
