import { Component, OnInit } from '@angular/core';
import { Trail } from '../models/trail';
import { User } from '../models/user';
import { MediaType } from '../enums/media-type';
import { Subscription } from 'rxjs';
import { TrailService } from '../services/trail-service';
import { Router } from '@angular/router';
import { RatingModalPage } from '../components/rating-modal/rating-modal.page';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../services/modal-service';
import { MediaModalPage } from '../components/media-modal/media-modal.page';

import { register } from 'swiper/element/bundle';
import { UserService } from '../services/user-service';

register();

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false,
})
export class DetailsPage implements OnInit {
  detailsSubscription?: Subscription;
  trail!: Trail
  average: number = 0
  postedBy: User = new User("", "", "");

  constructor(
    private trailService: TrailService,
    private router: Router,
    private modalService: ModalService,
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.trail = this.trailService.activeTrail;

    if (this.trail.uid) {
      const trailUser = await this.userService.getDataOnce(this.trail.uid);
      if (trailUser) {
        this.postedBy = trailUser[0] as User;
      }
    }

    this.average = this.trailService.getAverageRating(this.trail);
  }


  navigatePage(path: string) {
    this.router.navigateByUrl(path);
  }

  openMediaModal() {
    this.modalService.createModal(MediaModalPage);
  }

  openRatingModal() {
    this.modalService.createModal(RatingModalPage);
  }
}
