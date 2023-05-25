import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiURL = environment.baseURL;

  constructor(private http: HttpClient) { }
  getAll(): any {
    return this.http.get<any>(`${this.apiURL}clientes`);
  }

  Add(data: any) {
    return this.http.post<any>(`${this.apiURL}clientes`, data);
  }

  getCliente(id: any) {
    return this.http.get<any>(`${this.apiURL}clientes/${id}`);
  }

  getClientesUsuario(id: string) {
    return this.http.get<any>(`${this.apiURL}clientes/usuario/${id}`);
  }

  Edit(id: any, data: any) {
    return this.http.put<any>(`${this.apiURL}clientes/${id}`, data);
  }

  Delete(id: number) {
    return this.http.delete<any>(`${this.apiURL}clientes/${id}`);
  }
}
