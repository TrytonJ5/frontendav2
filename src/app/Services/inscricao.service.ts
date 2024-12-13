import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class inscricaoService {

  // constantes de url e header
  private inscricaoUrl = 'http://127.0.0.1:5000/api/v1/inscricao'
  private headers = new HttpHeaders({ "Authorization": "" })

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ "Authorization": this.authService.getToken() })
  }

  // inscricao get
  // ok
  listagemInscritosEvento(id_evento: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.inscricaoUrl}/evento/${id_evento}`, { "headers": this.headers }).pipe(
      map(inscritosEvento => {
        return inscritosEvento;
      })
    );
  }

  // ok
  listagemInscritosMinicurso(id_minicurso: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.inscricaoUrl}/minicurso/${id_minicurso}`, { "headers": this.headers }).pipe(
      map(inscritosMinicurso => {
        return inscritosMinicurso;
      })
    );
  }

  // inscricao post
  // ok
  inscreverEvento(id_evento: number, id_usuario: number) {
    let eventoUsuario = {
      "id_evento": id_evento,
      "id_usuario_participante": id_usuario
    }
    return this.http.post<any[]>(`${this.inscricaoUrl}/evento`, eventoUsuario, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    })
  }

  // ok
  inscreverMinicurso(id_minicurso: number,id_usuario: number) {
    let minicursoUsuario = {
      "id_minicurso": id_minicurso,
      "id_usuario_participante": id_usuario
    }
    return this.http.post<any[]>(`${this.inscricaoUrl}/minicurso`, minicursoUsuario, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    })
  }

  
  // inscricao delete
  // ok
  removerInscricaoEvento(id_evento:number,id_Usuario:number){
    this.http.delete<any>(`${this.inscricaoUrl}/evento/${id_evento}/${id_Usuario}`, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro: ', error);
      }
    });
  }

  // ok
  removerInscricaoMinicurso(id_minicurso:number,id_Usuario:number){
    this.http.delete<any>(`${this.inscricaoUrl}/minicurso/${id_minicurso}/${id_Usuario}`, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro: ', error);
      }
    });
  }

}
