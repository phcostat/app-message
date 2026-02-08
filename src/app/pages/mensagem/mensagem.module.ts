import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MensagemPageRoutingModule } from './mensagem-routing.module';

import { MensagemPage } from './mensagem.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensagemPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MensagemPage]
})
export class MensagemPageModule {}
