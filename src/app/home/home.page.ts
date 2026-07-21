import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase-service';
import { User } from '../models/user';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { TrailService } from '../services/trail-service';
import { Trail } from '../models/trail';
import { Music } from '../models/music';
import { MusicType } from '../enums/music-type';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { TrailModalPage } from '../trail-modal/trail-modal.page';

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
    private trailService: TrailService
  ) { }

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
