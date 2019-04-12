import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { MaterializeModule } from 'angular2-materialize';
import { NgProgressModule } from 'ngx-progressbar';
import { NgJsonEditorModule } from 'ang-jsoneditor'

import { AppComponent } from './app.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { routing } from './app.routes';
import { ServicoService } from './servico/servico.service';
import { MensagemComponent } from './mensagem/mensagem.component';
import { MensagemService } from './mensagem/mensagem.service';
import { PaginarComponent } from './paginar/paginar.component';
import { PaginarService } from './paginar/paginar.service';
import { FilterPipe } from './pipes';
import { CpfjPipe } from './pipe/cpf.pipe';
import { FilaComponent } from './fila/fila.component';
import { EditarJsonComponent } from './paginas/editar-json/editar-json.component';
import { TextMaskModule } from 'angular2-text-mask';
import { NgBrazil } from 'ng-brazil';


registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    CadastrarComponent,
    MensagemComponent,
    PaginarComponent,
    FilterPipe,
    CpfjPipe,
    FilaComponent,
    EditarJsonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    routing,
    NgProgressModule,
    TextMaskModule,
    NgJsonEditorModule,
    NgBrazil,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ServicoService, MensagemService, PaginarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
