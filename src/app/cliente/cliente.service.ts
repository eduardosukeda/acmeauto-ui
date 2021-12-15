import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.apiURL}/clientes`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.apiURL}/clientes`, cliente);
  }

  editCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${environment.apiURL}/clientes`, cliente);
  }

  deleteCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${environment.apiURL}/clientes/${cliente.cpf}`);
  }
}
