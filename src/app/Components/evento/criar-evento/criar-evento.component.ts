import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Evento } from '../../../Model/evento.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventoService } from '../../../Services/evento.service';

@Component({
  selector: 'app-criar-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-evento.component.html',
  styleUrl: './criar-evento.component.css'
})
export class CriarEventoComponent {
  class_validate = "needs-validation";
  evento: Evento | undefined;
  public idEvento!: number;

  form_dados = new FormGroup({
    nome_evento: new FormControl('', Validators.required),
    nome_responsavel: new FormControl('', Validators.required),
    email_responsavel: new FormControl('', Validators.required),
    cpf_responsavel: new FormControl('', Validators.required),
    data_inicio: new FormControl('', Validators.required),
    data_fim: new FormControl('', Validators.required),
    numero_vagas: new FormControl('', Validators.required),
    data_inscricao: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),

  });

  constructor(private router: Router, private eventoService: EventoService) {
    const state = this.router.getCurrentNavigation()?.extras.state
    if (state && state['idEvento']) {
      const idEvento = state['idEvento'];
      if (idEvento) {
        this.idEvento = idEvento;
      }
    }
  }

  ngOnInit(): void {
    if (this.idEvento) {
      this.eventoService.getEventoById(this.idEvento).subscribe({
        next: (evento) => {
          this.evento = evento
          this.preencheForm(this.evento)
        },
        error: (erro) => {
          console.log(erro)
        }
      });
    }
  }

  get f_dados() { return this.form_dados.controls; }

  // TODO IMPLEMENTAR O INPUT DATE

  preencheForm(evento: Evento) {
    this.f_dados.nome_evento.setValue(evento.nome);
    this.f_dados.nome_responsavel.setValue(evento.nome_responsavel);
    this.f_dados.email_responsavel.setValue(evento.email_responsavel);
    this.f_dados.cpf_responsavel.setValue(evento.cpf_responsavel);
    this.f_dados.data_inicio.setValue(evento.dt_inicio);
    this.f_dados.data_fim.setValue(evento.dt_fim);
    this.f_dados.numero_vagas.setValue(evento.numero_vagas);
    this.f_dados.data_inscricao.setValue(evento.dt_limite_inscricao);
    this.f_dados.descricao.setValue(evento.descricao);
  }

  valida_campos_dados(): boolean {
    if (this.form_dados.invalid) {
      this.class_validate = "was-validated"
      return false;
    } else {
      this.class_validate = "needs-validation"
      return true;
    }
  }

  salvarEvento() {
    if (this.valida_campos_dados()) {
      let evento = {
        "nome_evento": this.form_dados.get('nome_evento')?.value,
        "nome_responsavel": this.form_dados.get('nome_responsavel')?.value,
        "email_responsavel": this.form_dados.get('email_responsavel')?.value,
        "cpf_responsavel": this.form_dados.get('cpf_responsavel')?.value,
        "data_inicio": this.form_dados.get('data_inicio')?.value,
        "data_fim": this.form_dados.get('data_fim')?.value,
        "numero_vagas": this.form_dados.get('numero_vagas')?.value,
        "data_inscricao": this.form_dados.get('data_inscricao')?.value,
        "descricao": this.form_dados.get('descricao')?.value,
      }
      if (this.idEvento) {
        this.eventoService.atualizaEvento(evento, this.idEvento);
      } else {
      this.eventoService.criarEvento(evento)
      }
      this.router.navigateByUrl('');
    }
  }
  voltar() {
    this.router.navigateByUrl('');
  }
}
