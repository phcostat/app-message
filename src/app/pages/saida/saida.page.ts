import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Mensagem } from 'src/app/model/mensagem';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.page.html',
  styleUrls: ['./saida.page.scss'],
  standalone: false
})
export class SaidaPage implements OnInit {

  mensagens: Mensagem[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private toastController: ToastController,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  ionViewWillEnter() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listar().subscribe({
      next: (res: Object) => {
        this.usuarios = (res as Array<any>).map(u => Object.assign(new Usuario(), u));
        this.carregarMensagens();
      },
      error: () => {
        this.exibirMensagem('Erro ao carregar usuários.');
      }
    });
  }

  carregarMensagens() {
    const listaJson = localStorage.getItem('mensagensEnviadas');
    if (!listaJson) {
      this.mensagens = [];
      return;
    }

    const lista = JSON.parse(listaJson);

    this.mensagens = lista.map((m: any) => {
      const mensagem = Object.assign(new Mensagem(), m);

      const destinatarioId = m.usuarioDestinatario?.id || m.usuarioDestinatario; // aceita id direto ou objeto
      const destinatarioCompleto = this.usuarios.find(u => u.id === destinatarioId);

      if (destinatarioCompleto) {
        mensagem.usuarioDestinatario = destinatarioCompleto;
      } else {
        mensagem.usuarioDestinatario = { id: destinatarioId, nome: '(Destinatário desconhecido)' };
      }

      return mensagem;
    });

    console.log('Mensagens carregadas:', this.mensagens);
  }

  excluirMensagem(id: number) {
    this.mensagens = this.mensagens.filter(m => m.id !== id);
    localStorage.setItem('mensagensEnviadas', JSON.stringify(this.mensagens));
    this.exibirMensagem("Mensagem removida.");
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}


