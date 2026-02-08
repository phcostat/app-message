import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private apiUrl = 'https://api-aplicativo07.odiloncorrea.com';

  constructor(private http: HttpClient) { }

  listarNovas(idUsuario: number) {
    return this.http.get(`${this.apiUrl}/mensagem/${idUsuario}/novas`);
  }

  listarTodas(idUsuario: number) {
    return this.http.get(`${this.apiUrl}/mensagem/${idUsuario}/todas`);
  }

  enviar(mensagem: any) {
    return this.http.post(`${this.apiUrl}/mensagem`, mensagem);
  }

  excluir(id: number) {
    return this.http.delete(`${this.apiUrl}/mensagem/${id}`);
  }
}

