import { Injectable } from '@angular/core';
import { Palestra } from '../Model/palestra.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  // constantes de url e header
  private palestraUrl = 'http://127.0.0.1:5000/api/v1/palestra'
  private headers = new HttpHeaders({ "Authorization": "" })

  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ "Authorization": this.authService.getToken() })
  }

  // ok
  listarPalestra(): Observable<Palestra[]> {
    return this.http.get<Palestra[]>(`${this.palestraUrl}`, { "headers": this.headers }).pipe(
      map(palestras => {
        return palestras;
      })
    );
  }


  // ok
  criarPalestra(palestraParam: Palestra) {
    let palestraJson = {
      "Palestra": JSON.stringify(palestraParam)
    };
    this.http.post<any>(`${this.palestraUrl}`, palestraJson, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  // ok
  atualizaPalestra(palestraParam: Palestra,idPalestra : number) {
    let palestraJson = {
      "Palestra": JSON.stringify(palestraParam)
    };
    this.http.put<any>(`${this.palestraUrl}/${idPalestra}`, palestraJson, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  // ok
  deletaPalestra(idPalestra: number) {
    this.http.delete<any>(`${this.palestraUrl}/${idPalestra}`, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro: ', error);
      }
    });
  }

}