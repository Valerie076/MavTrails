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
import { RatingModalPage } from '../components/rating-modal/rating-modal.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  featureFilters: string[] = [];
  difficultyFilters: string[] = [];
  ratingFilters: number[] = [];

  selectedFeatures: string[] | undefined = undefined;
  selectedDifficulty: string | undefined = undefined;
  selectedRating: string | undefined = undefined;

  trailSubscription?: Subscription;

  trails?: Trail[];

  public results: Trail[] = [];

  constructor(
    private router: Router,
    private trailService: TrailService
  ) { }

  ionViewWillEnter() {
    this.trailSubscription = this.trailService.trails.subscribe((data: Trail[]) => {
      this.trails = data;
      this.results = [...this.trails];
    })
  }

  openTrailDetails(trail: Trail) {
    this.trailService.activeTrail = trail;
    this.navigatePage("details");
  }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    if (this.trails) {
      this.results = this.trails;
    }
    this.results = this.results!.filter((d) => d.name.toLowerCase().includes(query));
  }

  filter() {
    if (this.trails) {
      this.results = this.trails;
    }

    if (this.featureFilters.length != 0) {
      this.results = this.filterByFeatures(this.featureFilters);
    }

    if (this.difficultyFilters.length != 0) {
      this.results = this.filterByDifficulty(this.difficultyFilters[0]);
    }

    if (this.ratingFilters.length != 0) {
      this.results = this.filterByRating(this.ratingFilters[0]);
    }
  }

  onFeatureChange(event: any) {
    const selectedValues = event.detail.value;
    this.featureFilters = selectedValues;
    this.filter();
  }

  onDifficultyChange(event: any) {
    const selectedValues = event.detail.value;
    this.difficultyFilters = selectedValues;
    this.filter();
  }

  onRatingChange(event: any) {
    const selectedValues = event.detail.value;
    this.ratingFilters = selectedValues;
    this.filter();
  }

  filterByFeatures(values: string[]): Trail[] {
    return this.results!.filter((t) => {
      let check: boolean = true;
      for (let value of values) {
        if (!t.features.includes(value)) {
          check = false;
        }
      }
      return check;
    });
  }

  filterByDifficulty(value: string): Trail[] {
    return this.results!.filter((t) => t.difficulty.includes(value))
  }

  filterByRating(value: number): Trail[] {
    if (value == 0) {
      return this.results;
    }
    return this.results!.filter((t) => this.trailService.getAverageRating(t) >= value);
  }

  clearFeatures() {
    this.selectedFeatures = undefined;
    this.onFeatureChange({ detail: { value: [] } });
  }

  clearDifficulty() {
    this.selectedDifficulty = undefined;
    this.onDifficultyChange({ detail: { value: [] } });
  }

  clearRating() {
    this.selectedRating = undefined;
    this.onRatingChange({ detail: { value: [] } });
  }

  getFeatures(trail: Trail): string[] {
    return this.trailService.getFeatures(trail);
  }

  getStars(trail: Trail): string[] {
    return this.trailService.getStars(trail);
  }
}
