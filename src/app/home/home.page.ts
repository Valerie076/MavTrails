import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase-service';
import { User } from '../models/user';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { TrailModalPage } from '../trail-modal/trail-modal.page';
import { ModalController } from '@ionic/angular';
import { MediaModalPage } from '../media-modal/media-modal.page';
import { ModalService } from '../services/modal-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private modalService: ModalService
  ) { }

  async openMediaModal() {
  const modal = await this.modalCtrl.create({
    component: MediaModalPage
  });

  await modal.present();

}
async openTrailModal() {
  const modal = await this.modalCtrl.create({
    component: TrailModalPage
  });

  await modal.present();
}
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("login");
  }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)
  }
}
