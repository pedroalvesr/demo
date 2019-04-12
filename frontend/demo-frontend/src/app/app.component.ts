import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

import { MASKS, NgBrazilValidators } from 'ng-brazil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public MASKS = MASKS;
  public formFields;
  public form;
  constructor(public fb: FormBuilder) { 
    this.initValidators();
  }

  initValidators() {
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
}
