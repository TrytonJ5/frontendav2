import { Injectable } from '@angular/core';
import { Usuario } from '../Model/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // constantes de url e header
  private usuarioUrl = 'http://127.0.0.1:5000/api/v1/usuario'
  private headers = new HttpHeaders({ "Authorization": "" })
  private headers2 = new HttpHeaders({ "Authorization": "" })



  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = new HttpHeaders({ "Authorization": this.authService.getToken() })
    this.headers2 = new HttpHeaders({ "Authorization": this.authService.getToken(),"Content-Type": "application/json" })
  }

  
  //funçao para retornar lista de usuarios retorna uma array de usuarios 
  listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.usuarioUrl}`, { "headers": this.headers }).pipe(
      map(usuarios => {
        return usuarios;
      })
    );
  }
  
  //funçao para retornar um usuario
  buscarPorToken(): Observable<any>{
    return this.http.get<any>(`${this.usuarioUrl}/porToken`, { "headers": this.headers }).pipe(
      map(usuario => {
        return usuario;
      })
    );
  }

  //funcao para criar usuario recebendo um obejto do tipo usuario como parametro
  criarUsuario(usuarioParam: {nome:  string | null | undefined;cpf:  string | null | undefined;email:  string | null | undefined;senha: string | null | undefined; }) {
    
    this.http.post<any>(`${this.usuarioUrl}`, JSON.stringify({"cpf": usuarioParam.cpf,"nome":usuarioParam.nome,"email": usuarioParam.email,"senha":usuarioParam.senha}), { "headers": this.headers2}).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }
  //funcao para atualizar usuario retornando um usuario atualizado
  atualizaUsuario(usuarioParam: {nome:  string | null | undefined;cpf:  string | null | undefined;email:  string | null | undefined;senha: string | null | undefined; },idUsuario : number) {
    

    this.http.put<any>(`${this.usuarioUrl}/${idUsuario}`,JSON.stringify({"cpf": usuarioParam.cpf,"nome":usuarioParam.nome,"email": usuarioParam.email,"senha":usuarioParam.senha}), { "headers": this.headers2 }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro:', error);
      }
    });
  }

  //funcao para deletar usuario retornando um usuario atualizado recebendo um id como parametro
  deletaUsuario(id_usuario: number) {
    this.http.delete<any>(`${this.usuarioUrl}/${id_usuario}`, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro: ', error);
      }
    });
  }


  promoverUsuario(id_usuario: number) {
    this.http.post<any>(`${this.usuarioUrl}/promover/${id_usuario}`,this.headers, { "headers": this.headers }).subscribe({
      next: data => {
        return data;
      },
      error: error => {
        console.error('Houve um erro: ', error);
      }
    });
  }



}
