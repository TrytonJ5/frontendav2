import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../Services/evento.service';
import { AuthService } from '../../../Services/auth.service';
import { UsuarioService } from '../../../Services/usuario.service';
import { inscricaoService } from '../../../Services/inscricao.service';
import { Evento } from '../../../Model/evento.model';

@Component({
  selector: 'app-evento-detalhe',
  standalone: true,
  imports: [],
  templateUrl: './evento-detalhe.component.html',
  styleUrl: './evento-detalhe.component.css'
})
export class EventoDetalheComponent {
  evento !: Evento;
  idEvento!: number;
  nome_evento = "";

  constructor(private router: Router, private eventoService: EventoService, private authService: AuthService, private usuarioService: UsuarioService, private inscricaoService: inscricaoService) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state['idEvento']) {
      const idEvento = state['idEvento'];
      if (idEvento) {
        this.idEvento = idEvento;
      }
    }
  }

  ngOnInit() {
    if (this.idEvento) {
      this.eventoService.getEventoById(this.idEvento).subscribe({
        next: (evento) => {
          this.evento = evento
          this.nome_evento = evento.nome;
        },
        error: (erro) => {
          console.log(erro)
        }
      });
    }
  }

  voltar() {
    this.router.navigateByUrl('');
  }
}
