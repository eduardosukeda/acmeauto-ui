import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Automovel } from '../interfaces/automovel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AutomovelService {

  constructor(private http: HttpClient) { }

  getAutomoveis(): Observable<Automovel[]> {
    return this.http.get<Automovel[]>(`${environment.apiURL}/automoveis`);
  }

  createAutomovel(cliente: Automovel): Observable<Automovel> {
    return this.http.post<Automovel>(`${environment.apiURL}/automoveis`, cliente);
  }

  editAutomovel(cliente: Automovel): Observable<Automovel> {
    return this.http.put<Automovel>(`${environment.apiURL}/automoveis`, cliente);
  }

  deleteAutomovel(cliente: Automovel): Observable<Automovel> {
    return this.http.delete<Automovel>(`${environment.apiURL}/automoveis/${cliente.placa}`);
  }
}
