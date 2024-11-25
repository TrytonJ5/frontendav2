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
  private eventoUrl = 'http://127.0.0.1:5000/api/v1/event'
  private headers = new HttpHeaders({ "Authorization": "" })

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ "Authorization": this.authService.getToken() })
  }

  // ok
  listarEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.eventoUrl}`, { "headers": this.headers }).pipe(
      map(eventos => {
        return eventos;
      })
    );
  }

  // ok
  listarEventoPeriodo(dtInicio: string, dtFim:string): Observable<any[]>{
    let body = {
      "dt_inicio": dtInicio,
      "dt_fim": dtFim
    };

    return this.http.get<any[]>(`${this.eventoUrl}/periodo`,{ "headers": this.headers,"params": body }).pipe(
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
  criarEvento(EventoParam: Evento) {
    let eventoJson = {
      "evento": JSON.stringify(EventoParam)
    };
    this.http.post<any>(`${this.eventoUrl}`, eventoJson, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  // ok
  atualizaEvento(EventoParam: Evento, idEvento: number) {
    let eventoJson = {
      "evento": JSON.stringify(EventoParam)
    };
    this.http.put<any>(`${this.eventoUrl}/${idEvento}`, eventoJson, { "headers": this.headers }).subscribe({
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
