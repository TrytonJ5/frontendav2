import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../Model/usuario.model';
import { UsuarioService } from '../../../Services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css'
})
export class UsuarioListComponent {
  usuarios: Array<Usuario> = [];
  adminPrint !: string;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.atualizaUsuario();
  }

  atualizaUsuario() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (erro) => {
        console.log(erro)
      }
    });
  }

  voltar() {
    this.router.navigateByUrl('');
  }
  remover(id: number) {
    this.usuarioService.deletaUsuario(id);
    this.atualizaUsuario();
  }
  promover(id: number) {
    this.usuarioService.promoverUsuario(id);
    this.atualizaUsuario();
  }
}
