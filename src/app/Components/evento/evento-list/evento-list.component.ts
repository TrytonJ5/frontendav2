import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../Services/evento.service';
import { Evento } from '../../../Model/evento.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../Services/auth.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { inscricaoService } from '../../../Services/inscricao.service';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evento-list.component.html',
  styleUrl: './evento-list.component.css'
})
export class EventoListComponent {
  eventos: Array<Evento> = [];
  usuarioAtual !: boolean;
  idUsuario!: number;

  constructor(private router: Router, private eventoService: EventoService, private authService: AuthService, private usuarioService: UsuarioService, private inscricaoService: inscricaoService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.usuarioService.buscarPorToken().subscribe({
        next: (usuario) => {
          this.usuarioAtual = usuario.administrador;
          this.idUsuario = usuario.id;
        },
        error: (erro) => {
          window.location.reload();
          console.log(erro)
        }
      });
    }

    this.atualizaUsuario();
  }

  atualizaUsuario() {
    this.eventoService.listarEvento().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
      },
      error: (erro) => {
        console.log(erro)
      }
    });
  }
  // formatar data

  editar(id: number) {
    this.router.navigateByUrl('/evento/criar', { state: { idEvento: id } });
  }

  remover(id: number) {
    this.eventoService.deletaEvento(id);
    this.atualizaUsuario();
  }
  Inscrever(idEvento: number) {
    this.inscricaoService.inscreverEvento(idEvento, this.idUsuario)
    this.atualizaUsuario();
  }
  Detalhar(idEvento: number) {
    this.router.navigateByUrl('/evento/detalhe', { state: { idEvento: idEvento } })
  }
  listarInscricao(id: number) {
    // listamge de inscricao detalhe
  }

  voltar() {
    this.router.navigateByUrl('');
  }
}
