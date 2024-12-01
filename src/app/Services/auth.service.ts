import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:5000/api/v1/usuario/logar';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private http: HttpClient) { }

  login(userParam: { cpf: any; password: string | null | undefined; }): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}`,JSON.stringify({ "cpf": userParam.cpf, "senha": userParam.password }), {"headers":this.headers}).pipe(
      map(data => {
        return data;
      })
    );
  }
  isLoggedIn(): boolean {
    if (sessionStorage.getItem("token")) {
      return true;
    }
    return false;
  }
  setToken(token: string) {
    sessionStorage.setItem("token", token);
  }
  getToken(): string {
    return sessionStorage.getItem("token") ?? '';
  }
  logout() {
    sessionStorage.removeItem("token");
  }
}