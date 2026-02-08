import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'entrada',
    loadChildren: () => import('./pages/entrada/entrada.module').then( m => m.EntradaPageModule)
  },
  {
    path: 'saida',
    loadChildren: () => import('./pages/saida/saida.module').then( m => m.SaidaPageModule)
  },
  {
    path: 'mensagem',
    loadChildren: () => import('./pages/mensagem/mensagem.module').then( m => m.MensagemPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
