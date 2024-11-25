import { Injectable } from '@angular/core';
import { Minicurso } from '../Model/minicurso.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  // constantes de url e header
  private minicursoUrl = 'http://127.0.0.1:5000/api/v1/minicurso'
  private headers = new HttpHeaders({ "Authorization": "" })

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ "Authorization": this.authService.getToken() })
  }

   // ok
   listarMinicurso(): Observable<Minicurso[]> {
    return this.http.get<Minicurso[]>(`${this.minicursoUrl}`, { "headers": this.headers }).pipe(
      map(minicursos => {
        return minicursos;
      })
    );
  }

  // ok
  criarMinicurso(minicursoParam: Minicurso) {
    let minicursoJson = {
      "minicurso": JSON.stringify(minicursoParam)
    };
    this.http.post<any>(`${this.minicursoUrl}`, minicursoJson, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  // ok
  atualizaMinicurso(minicursoParam: Minicurso,idMinicurso : number) {
    let minicursoJson = {
      "minicurso": JSON.stringify(minicursoParam)
    };
    this.http.put<any>(`${this.minicursoUrl}/${idMinicurso}`, minicursoJson, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  // ok
  deletaMinicurso(idMinicurso: number) {
    this.http.delete<any>(`${this.minicursoUrl}/${idMinicurso}`, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro: ', error);
      }
    });
  }

}