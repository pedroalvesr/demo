import {Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core/';


import { PessoaComponent } from './pessoa/pessoa.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { MensagemComponent } from './mensagem/mensagem.component';
import { PaginarComponent } from './paginar/paginar.component';
import { FilaComponent } from './fila/fila.component';


const APP_ROUTES: Routes = [
    {path: 'fila', component: FilaComponent},
    {path: 'paginacao', component: PaginarComponent},
    {path: 'mensagem', component: MensagemComponent},
    {path: 'cadastrar', component: CadastrarComponent},
    {path: 'listar', component: PessoaComponent},
    {path: '', component: PessoaComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES, {useHash: true});

