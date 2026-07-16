import { ComponentRef, Injectable, Type } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(
    private modalController: ModalController
  ) { }

  async createModal(component: Type<any>) {
    let modal = await this.modalController.create({
      component: component
    });
    await modal.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
