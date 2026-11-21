import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private alertController: AlertController) {}

  async createAlert(header: string, message: any) {

    let alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: "Ok",
          handler: () => {
            this.alertController.dismiss(null)
          }
        }
      ]
    })
    await alert.present();
    console.error(message);
  }
}
