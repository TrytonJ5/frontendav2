import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { UsuarioService } from './Services/usuario.service';
import { Usuario } from './Model/usuario.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nomeUsuario !: string;
  apareceButao!: boolean;
  user!: Usuario;

  constructor(private router: Router, private authservice: AuthService, private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    if (this.authservice.isLoggedIn()) {
      this.apareceButao = true;
      this.usuarioService.buscarPorToken().subscribe({
        next: (usuario) => {
          this.nomeUsuario = usuario.nome;
          this.user = usuario
        },
        error: (erro) => {
          console.log(erro);
        }
      });
    } else {
      this.apareceButao = false;
    }

  }
  loginOff() {
    this.authservice.logout();
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
  }
  editar() {
    this.router.navigateByUrl('/usuario/criar');
  }

  remover() {
    this.usuarioService.deletaUsuario(this.user.id);
    this.loginOff()
  }
}
