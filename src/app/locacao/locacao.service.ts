import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Automovel } from '../interfaces/automovel';
import { CalculoRequest } from '../interfaces/calculo-req';
import { CalculoResponse } from '../interfaces/calculo-res';
import { Cliente } from '../interfaces/cliente';
import { Locacao } from '../interfaces/locacao';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class LocacaoService {

  constructor(private http: HttpClient) { }

  createLocacao(locacao: Locacao): Observable<Locacao> {
    return this.http.post<Locacao>(`${environment.apiURL}/locacoes`, locacao);
  }

  calcularLocacao(calculo: CalculoRequest): Observable<CalculoResponse> {
    return this.http.post<CalculoResponse>(`${environment.apiURL}/locacoes/calcular`, calculo);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${environment.apiURL}/clientes`);
  }

  getAutomoveis(): Observable<Automovel[]> {
    return this.http.get<Automovel[]>(`${environment.apiURL}/automoveis`);
  }
}
