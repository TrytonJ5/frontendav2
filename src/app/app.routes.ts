import { Routes } from '@angular/router';
import { CriarUsuarioComponent } from './Components/criar-usuario/criar-usuario.component';
import { UsuarioListComponent } from './Components/usuario-list/usuario-list.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
    {path: 'usuario/criar',component:CriarUsuarioComponent},
    {path: 'usuario/listar', component: UsuarioListComponent},
    {path: 'login', component: LoginComponent}

];
