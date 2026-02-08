import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://api-aplicativo07.odiloncorrea.com';

  constructor(private http: HttpClient) {}

  autenticar(login: string, senha: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url}/usuario/${login}/${senha}/autenticar`);
  }

  registrar(usuario: Usuario) {
    localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
  }

  carregar(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioAutenticado') || '{}');
  }

  encerrar() {
    localStorage.removeItem('usuarioAutenticado');
  }

  listar() {
    return this.http.get(`${this.url}/usuario`);
  }


}