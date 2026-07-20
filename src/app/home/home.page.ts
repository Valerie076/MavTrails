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
  ) {
    trailService.saveTrail(
      new Trail(
        "id",
        100,
        "Hard",
        [10, 9, 10, 9, 9, 8, 7, 10, 9],
        "Elmwood Park Trail",
        1200,
        "A cool trail through the park.",
        ["Trees"],
        [new Music("id", "Best Song", "Best Artist", MusicType.Song)],
        [],
        []
      )
    )
  }

  ionViewWillEnter() {
    this.trailSubscription = this.trailService.trails.subscribe((data: Trail[]) => {
      this.trails = data
    })
    console.log(this.trails);
    
  }

  openTrailDetails(trail: Trail) {
    console.log(trail);
    
    this.trailService.saveTrail(trail);
    console.log("SAVED");
    
    this.trailService.activeTrail = trail;
    console.log("ACTIVE");
    
    this.router.navigateByUrl("details");
    console.log("SWITCH");
    
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("login");
  }
}
