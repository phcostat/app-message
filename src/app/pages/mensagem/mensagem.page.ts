import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { Mensagem } from 'src/app/model/mensagem';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MensagemService } from 'src/app/services/mensagem.service';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
  standalone: false
})
export class MensagemPage implements OnInit {

  usuarios: Usuario[];
  mensagem: Mensagem;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private navController: NavController,
    private usuarioService: UsuarioService,
    private mensagemService: MensagemService
  ) {
    this.usuarios = [];
    this.mensagem = new Mensagem();

    this.formGroup = this.formBuilder.group({
      destinatarioId: [this.mensagem.usuarioDestinatario, Validators.required],
      texto: [this.mensagem.texto, Validators.required]
    });
  }

  ngOnInit() {
    this.carregarUsuarios();
  }

  enviarMensagem() {
    const usuario = JSON.parse(localStorage.getItem('usuarioAutenticado') || '{}');

    const mensagem: Mensagem = new Mensagem();
    mensagem.usuarioRemetente = usuario;

    // Corrigido: Enviando destinatário como objeto
    mensagem.usuarioDestinatario = new Usuario();
    mensagem.usuarioDestinatario.id = this.formGroup.value.destinatarioId;

    mensagem.texto = this.formGroup.value.texto;

    console.log('Enviando mensagem:', mensagem);

    this.mensagemService.enviar(mensagem).subscribe({
      next: () => {
        this.salvarMensagemLocal(mensagem);
        this.exibirMensagem("Mensagem enviada com sucesso!");
        this.navController.navigateBack('/menu');
      },
      error: (err) => {
        console.error('Erro no envio:', err);
        if (err.error?.text) {
          console.warn('Resposta da API (texto):', err.error.text);
        }
        this.exibirMensagem("Erro ao enviar a mensagem.");
      }
    });
  }

  salvarMensagemLocal(mensagem: Mensagem) {
    let lista = JSON.parse(localStorage.getItem('mensagensEnviadas') || '[]');
    mensagem.id = new Date().getTime();
    lista.push(mensagem);
    localStorage.setItem('mensagensEnviadas', JSON.stringify(lista));
  }

  carregarUsuarios() {
    this.usuarioService.listar().subscribe({
      next: (res: Object) => {
        this.usuarios = (res as Array<any>).map(u => Object.assign(new Usuario(), u));
      },
      error: () => {
        this.exibirMensagem('Erro ao carregar usuários.');
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


