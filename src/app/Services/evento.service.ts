import { Injectable } from '@angular/core';
import { Evento } from '../Model/evento.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  // constantes de url e header
  private eventoUrl = 'http://127.0.0.1:5000/api/v1/evento'
  private headers = new HttpHeaders({ "Authorization": "" })
  private headers2 = new HttpHeaders({ "Authorization": "" })

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ "Authorization": this.authService.getToken() })
    this.headers2 = new HttpHeaders({ "Authorization": this.authService.getToken(), "Content-Type": "application/json" })
  }

  // ok
  listarEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.eventoUrl}`, { "headers": this.headers }).pipe(
      map(eventos => {
        return eventos;
      })
    );
  }

  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.eventoUrl}/${id}`, { "headers": this.headers }).pipe(
      map(evento => {
        return evento;
      })
    )
  }

  // ok
  listarEventoPeriodo(dtInicio: string, dtFim: string): Observable<any[]> {
    let body = {
      "dt_inicio": dtInicio,
      "dt_fim": dtFim
    };

    return this.http.get<any[]>(`${this.eventoUrl}/periodo`, { "headers": this.headers, "params": body }).pipe(
      map(eventos => {
        return eventos;
      })
    );
  }

  // ok
  buscarProgramacao(id_evento: number): Observable<any> {
    return this.http.get<any>(`${this.eventoUrl}/programacao/${id_evento}`, { "headers": this.headers }).pipe(
      map(programacao => {
        return programacao;
      })
    )
  };

  // ok
  criarEvento(EventoParam: { nome_evento: string | null | undefined, nome_responsavel: string | null | undefined, email_responsavel: string | null | undefined, cpf_responsavel: string | null | undefined, data_inicio: string | null | undefined, data_fim: string | null | undefined, numero_vagas: string | null | undefined, data_inscricao: string | null | undefined, descricao: string | null | undefined }) {

    this.http.post<any>(`${this.eventoUrl}`, JSON.stringify({ "nome": EventoParam.nome_evento, "dt_inicio": EventoParam.data_inicio, "dt_fim": EventoParam.data_fim, "descricao": EventoParam.descricao, "nome_responsavel": EventoParam.nome_responsavel, "cpf_responsavel": EventoParam.cpf_responsavel, "email_responsavel": EventoParam.email_responsavel, "numero_vagas": EventoParam.numero_vagas, "dt_limite_inscricao": EventoParam.data_inscricao }), { "headers": this.headers2 }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  // ok
  atualizaEvento(EventoParam: { nome_evento: string | null | undefined, nome_responsavel: string | null | undefined, email_responsavel: string | null | undefined, cpf_responsavel: string | null | undefined, data_inicio: string | null | undefined, data_fim: string | null | undefined, numero_vagas: string | null | undefined, data_inscricao: string | null | undefined, descricao: string | null | undefined }, idEvento: number) {

    this.http.put<any>(`${this.eventoUrl}/${idEvento}`, JSON.stringify({ "nome": EventoParam.nome_evento, "dt_inicio": EventoParam.data_inicio, "dt_fim": EventoParam.data_fim, "descricao": EventoParam.descricao, "nome_responsavel": EventoParam.nome_responsavel, "cpf_responsavel": EventoParam.cpf_responsavel, "email_responsavel": EventoParam.email_responsavel, "numero_vagas": EventoParam.numero_vagas, "dt_limite_inscricao": EventoParam.data_inscricao }), { "headers": this.headers2 }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  // ok
  deletaEvento(id_evento: number) {
    this.http.delete<any>(`${this.eventoUrl}/${id_evento}`, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro: ', error);
      }
    });
  }
}
