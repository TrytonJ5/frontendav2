import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { CriarUsuarioComponent } from './Components/usuario/criar-usuario/criar-usuario.component';
import { UsuarioListComponent } from './Components/usuario/usuario-list/usuario-list.component';

export const routes: Routes = [
    {path: 'usuario/criar',component:CriarUsuarioComponent},
    {path: 'usuario/listar', component: UsuarioListComponent},
    {path: 'login', component: LoginComponent},
    {path: '',component:HomeComponent}

];
