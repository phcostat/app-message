import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage {

  menu = [
    { titulo: 'Caixa de Entrada', rota: '/entrada', icone: "mail", cor: 'primary' },
    { titulo: 'Caixa de Saída', rota: '/saida', icone: "send", cor: 'primary' },
    { titulo: 'Nova Mensagem', rota: '/mensagem', icone: "create", cor: 'primary' },
    { titulo: 'Sair', rota: '/login', icone: "exit", cor: 'danger' }
  ];

  constructor(private navCtrl: NavController) {}

  navegar(item: any) {
    if (item.titulo === 'Sair') {
      localStorage.clear();
      this.navCtrl.navigateRoot(item.rota);
    } else {
      this.navCtrl.navigateForward(item.rota);
    }
  }
}
