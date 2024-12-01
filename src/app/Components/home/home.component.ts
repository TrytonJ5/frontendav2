import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  usuarioAtual !: boolean;

  constructor(private router: Router, private usuarioService: UsuarioService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.usuarioService.buscarPorToken().subscribe({
        next: (usuario) => {
          this.usuarioAtual = usuario.administrador;
        },
        error: (erro) => {
          window.location.reload();
          console.log(erro)
        }
      });
    }
  }

  listarMinicurso(): void {
    this.router.navigateByUrl('usuario/listar')
  }
  listarPalestra(): void {
    this.router.navigateByUrl('usuario/listar')
  }
  listarEvento(): void {
    this.router.navigateByUrl('evento/listar')
  }
  listarUsuario(): void {
    this.router.navigateByUrl('usuario/listar')
  }

  criarMinicurso(): void {
    this.router.navigateByUrl('usuario/criar')
  }
  criarPalestra(): void {
    this.router.navigateByUrl('usuario/criar')
  }
  criarEvento(): void {
    this.router.navigateByUrl('evento/criar')
  }
  criarUsuario(): void {
    this.router.navigateByUrl('usuario/criar')
  }
}
