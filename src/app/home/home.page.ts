import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase-service';
import { User } from '../models/user';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { MediaModalPage } from '../components/media-modal/media-modal.page';
import { ModalService } from '../services/modal-service';
import { TrailService } from '../services/trail-service';
import { Trail } from '../models/trail';
import { Music } from '../models/music';
import { MusicType } from '../enums/music-type';
import { Subscription } from 'rxjs';
import { TrailModalPage } from '../components/trail-modal/trail-modal.page';
import { RatingModalPage } from '../rating-modal/rating-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  trailSubscription?: Subscription;

  trails?: Trail[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalCtrl: ModalController,
    private modalService: ModalService,
    private trailService: TrailService
  ) { }


  async openRatingModal() {

  const modal = await this.modalCtrl.create({
    component: RatingModalPage
  });

  await modal.present();

}
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
}
    
  ionViewWillEnter() {
    this.trailSubscription = this.trailService.trails.subscribe((data: Trail[]) => {
      this.trails = data
    })
  }

  openTrailDetails(trail: Trail) {
    this.trailService.saveTrail(trail);

    this.trailService.activeTrail = trail;

    this.navigatePage("details");
  }

  async logout() {
    await this.authService.logout();
    this.navigatePage("login");
  }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)

  }
}
