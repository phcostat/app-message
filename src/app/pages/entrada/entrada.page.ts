import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MensagemService } from 'src/app/services/mensagem.service';
import { Mensagem } from 'src/app/model/mensagem';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.page.html',
  styleUrls: ['./entrada.page.scss'],
  standalone: false
})
export class EntradaPage implements OnInit {

  mensagens: Mensagem[] = [];

  constructor(
    private mensagemService: MensagemService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.carregarMensagens();
  }

  ionViewWillEnter() {
    this.carregarMensagens();
  }

  carregarMensagens() {
    const usuarioJson = localStorage.getItem('usuarioAutenticado');
    if (!usuarioJson) return;

    const usuario = JSON.parse(usuarioJson);
    if (!usuario.id) return;

    this.mensagemService.listarTodas(usuario.id).subscribe({
      next: (res: Object) => {
        this.mensagens = (res as Array<any>).map(obj => Object.assign(new Mensagem(), obj));
      },
      error: () => {
        this.exibirMensagem('Erro ao carregar mensagens.');
      }
    });
  }

  excluirMensagem(id: number) {
    this.mensagemService.excluir(id).subscribe({
      next: () => {
        this.exibirMensagem('Mensagem excluída com sucesso!');
        this.carregarMensagens();
      },
      error: () => {
        this.exibirMensagem('Erro ao excluir mensagem.');
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
