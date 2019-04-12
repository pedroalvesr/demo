import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NgProgressModule } from 'ngx-progressbar';
import { NgJsonEditorModule } from 'ang-jsoneditor'
import { TextMaskModule } from 'angular2-text-mask';

import { EditarJsonComponent } from './paginas/editar-json/editar-json.component';
import { PessoaComponent } from './paginas/pessoa/pessoa.component';
import { CadastrarComponent } from './paginas/cadastrar/cadastrar.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { PaginarComponent } from './componentes/paginar/paginar.component';
import { FilaComponent } from './paginas/fila/fila.component';
import { FilterPipe } from './pipes/pipes';
import { CpfjPipe } from './pipes/cpf.pipe';
import { NgBrazil } from 'ng-brazil';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

import { ServicoService } from './servicos/servico.service';
import { MensagemService } from './componentes/mensagem/mensagem.service';
import { PaginarService } from './componentes/paginar/paginar.service';
import { LoginComponent } from './paginas/login/login.component';
import { LoginService } from './servicos/login.service';
import { LoginGuard } from './guards/login.guard';
import { LoginInterceptor } from './interceptors/login-interceptor';

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
    EditarJsonComponent,
    LoginComponent
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
    ServicoService, MensagemService, PaginarService, LoginService, LoginGuard,
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
