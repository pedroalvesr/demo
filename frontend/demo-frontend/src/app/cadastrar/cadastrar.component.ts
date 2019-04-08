import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { ServicoService } from '../servico/servico.service';
import { Jsonp } from '@angular/http/src/http';
import { PessoaComponent } from '../pessoa/pessoa.component';
import { MASKS, NgBrazilValidators } from 'ng-brazil';


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
    private route: Router,
    public fb: FormBuilder
    ) { }

  @Input() id: string;

  pessoa: any = {};

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        if (params.id != null) {
          this.editarPessoa(params.id);
        }
      }
    );

    this.formFields = {
      estado: [''],
      cpf: ['', [<any>Validators.required, <any>NgBrazilValidators.cpf]],
      cnpj: ['', [<any>Validators.required, <any>NgBrazilValidators.cnpj]],
      rg: ['', [<any>Validators.required, <any>NgBrazilValidators.rg]],
      cep: ['', [<any>Validators.required, <any>NgBrazilValidators.cep]],
      telefone: ['', [<any>Validators.required, <any>NgBrazilValidators.telefone]],
    };
    this.form = this.fb.group(this.formFields);
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
