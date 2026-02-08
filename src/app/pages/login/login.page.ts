import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  usuario: Usuario;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private navController: NavController,
    private usuarioService: UsuarioService
  ) {
    this.usuario = new Usuario();

    this.formGroup = this.formBuilder.group({
      'login': ['', Validators.required],
      'senha': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.usuarioService.encerrar();
  }

  autenticar() {
    const login = this.formGroup.value.login;
    const senha = this.formGroup.value.senha;

    this.usuarioService.autenticar(login, senha).subscribe({
      next: (usuario) => {
        if (usuario && usuario.id) {
          this.usuarioService.registrar(usuario);
          this.navController.navigateBack('/menu');
        } else {
          this.exibirMensagem("Login inválido.");
        }
      },
      error: () => {
        this.exibirMensagem("Usuário ou senha incorretos.");
      }
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}



