import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/';

import { PessoaComponent } from './paginas/pessoa/pessoa.component';
import { CadastrarComponent } from './paginas/cadastrar/cadastrar.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { LoginComponent } from './paginas/login/login.component';
import { LoginGuard } from './guards/login.guard';


const APP_ROUTES: Routes = [
    { path: 'login/:to', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'mensagem', component: MensagemComponent },
    { path: 'cadastrar', component: CadastrarComponent, canActivate: [LoginGuard] },
    { path: 'listar', component: PessoaComponent, canActivate: [LoginGuard] },
    { path: '', component: PessoaComponent, canActivate: [LoginGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, { useHash: true });

