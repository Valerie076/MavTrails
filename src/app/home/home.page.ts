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
import { MediaType } from '../enums/media-type';
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

  public results: Trail[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private trailService: TrailService
  ) { }

  ionViewWillEnter() {
    this.trailSubscription = this.trailService.trails.subscribe((data: Trail[]) => {
      this.trails = data
      console.log(this.trails)
      this.results = [...this.trails];
    })
  }

  openTrailDetails(trail: Trail) {
    this.trailService.activeTrail = trail;

    console.log(trail)
    this.navigatePage("details");
  }

  async logout() {
    await this.authService.logout();
    this.navigatePage("login");
  }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)

  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.trails!.filter((d) => d.name.toLowerCase().includes(query));
  }

  onFeatureChange(event: any) {
  // Capture the selected value from the event detail
  const selectedValue = event.detail.value; 
  
  console.log('User selected:', selectedValue);
  this.filterByFeatures(selectedValue);
}

filterByFeatures(value: string) {
  this.results = this.trails!.filter((d) => d.features.includes(value))
}
  
 onDifficultyChange(event: any) {
  // Capture the selected value from the event detail
  const selectedValue = event.detail.value; 
  
  console.log('User selected:', selectedValue);
  this.filterByDifficulty(selectedValue);
}

filterByDifficulty(value: string) {
  this.results = this.trails!.filter((d) => d.difficulty.includes(value))
}
}