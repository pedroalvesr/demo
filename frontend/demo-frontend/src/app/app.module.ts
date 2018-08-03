import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';
import { NgProgressModule } from 'ngx-progressbar';

import { AppComponent } from './app.component';
import { PessoaComponent } from './pessoa/pessoa.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { routing } from './app.routes';
import { ServicoService } from './servico/servico.service';
import { MensagemComponent } from './mensagem/mensagem.component';
import { MensagemService } from './mensagem/mensagem.service';
import { PaginarComponent } from './paginar/paginar.component';
import { PaginarService } from './paginar/paginar.service';
import { FilterPipe, SortByPipe } from './pipes';
import { CpfjPipe } from './pipe/cpf.pipe';
import { FilaComponent } from './fila/fila.component';


@NgModule({
  declarations: [
    AppComponent,
    PessoaComponent,
    CadastrarComponent,
    MensagemComponent,
    PaginarComponent,
    FilterPipe,
    SortByPipe,
    CpfjPipe,
    FilaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    routing,
    NgProgressModule
  ],
  providers: [
    ServicoService, MensagemService, PaginarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
