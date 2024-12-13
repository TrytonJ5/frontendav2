import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { CriarUsuarioComponent } from './Components/usuario/criar-usuario/criar-usuario.component';
import { UsuarioListComponent } from './Components/usuario/usuario-list/usuario-list.component';
import { CriarEventoComponent } from './Components/evento/criar-evento/criar-evento.component';
import { EventoListComponent } from './Components/evento/evento-list/evento-list.component';
import { accessGuard } from './security/access.guard';
import { EventoInscritosComponent } from './Components/evento/evento-inscritos/evento-inscritos.component';
import { EventoDetalheComponent } from './Components/evento/evento-detalhe/evento-detalhe.component';

export const routes: Routes = [
    {path: 'usuario/criar',component:CriarUsuarioComponent},
    {path: 'usuario/listar',canActivate:[accessGuard], component: UsuarioListComponent},
    {path: 'evento/criar',canActivate:[accessGuard], component: CriarEventoComponent},
    {path: 'evento/listar',canActivate:[accessGuard], component:EventoListComponent},
    {path: 'evento/inscritos',canActivate:[accessGuard],component: EventoInscritosComponent},
    {path: 'evento/detalhe',canActivate:[accessGuard],component: EventoDetalheComponent},
    {path: 'login', component: LoginComponent},
    {path: '',canActivate:[accessGuard],component:HomeComponent}

];
