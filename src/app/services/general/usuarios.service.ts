import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiURL = environment.baseURL;

  constructor(private http: HttpClient) { }
  getAll(): any {
    return this.http.get<any>(`${this.apiURL}usuarios`);
  }

  Add(data: any) {
    return this.http.post<any>(`${this.apiURL}usuarios`, data);
  }

  getUsuario(id: string) {
    return this.http.get<any>(`${this.apiURL}usuarios/${id}`);
  }

  auth(data: any) {
    return this.http.post<any>(`${this.apiURL}usuarios/auth`, data);
  }

  Edit(id: any, data: any) {
    return this.http.put<any>(`${this.apiURL}usuarios/${id}`, data);
  }

  Delete(id: number) {
    return this.http.delete<any>(`${this.apiURL}usuarios/${id}`);
  }

  //credenciales 
  private authKey = 'auth';
  private idUsuarioKey = 'idUsuario';
  private userKey = 'user';

  obtenerToken(): string | null {
    return localStorage.getItem(this.authKey);
  }

  guardarCredenciales(token: string, idUsuario: string, user: string): void {
    localStorage.setItem(this.authKey, token);
    localStorage.setItem(this.idUsuarioKey, idUsuario);
    localStorage.setItem(this.userKey, user);
  }

  obtenerCredenciales(): { token: string, idUsuario: string, user: string } | null {
    const token = localStorage.getItem(this.authKey);
    const idUsuario = localStorage.getItem(this.idUsuarioKey);
    const user = localStorage.getItem(this.userKey);

    if (token && idUsuario && user) {
      return { token, idUsuario, user };
    } else {
      return null;
    }
  }

  eliminarCredenciales(): void {
    localStorage.removeItem(this.authKey);
    localStorage.removeItem(this.idUsuarioKey);
    localStorage.removeItem(this.userKey);
  }
}
