import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventoService } from '../../../Services/evento.service';
import { Evento } from '../../../Model/evento.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evento-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evento-list.component.html',
  styleUrl: './evento-list.component.css'
})
export class EventoListComponent {
  eventos: Array<Evento> = [];

  constructor(private router: Router,private eventoService: EventoService) { }

  ngOnInit(): void {
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

  editar(id: number) {
    this.router.navigateByUrl('/evento/criar', { state: { idEvento: id } });
  }

  remover(id: number) {
    this.eventoService.deletaEvento(id);
    this.atualizaUsuario();
  }
  Inscrever(id:number){

  }
  Desinscrever(id: number){

  }

  voltar() {
    this.router.navigateByUrl('');
  }
}
