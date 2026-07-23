import { Component, OnInit } from '@angular/core';
import { Trail } from '../models/trail';
import { User } from '../models/user';
import { MediaType } from '../enums/media-type';
import { Subscription } from 'rxjs';
import { TrailService } from '../services/trail-service';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal-service';
import { MediaModalPage } from '../components/media-modal/media-modal.page';
import { RatingModalPage } from '../rating-modal/rating-modal.page';

import { register } from 'swiper/element/bundle';

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
  
  postedBy: User = new User("ur mom", "MeruniPoopyButt", "https://thumbs.dreamstime.com/b/surprised-shocked-funny-bird-close-up-frame-highlighting-exaggerated-meme-worthy-facial-expressions-professional-photo-369144049.jpg")

  constructor(
    private trailService: TrailService,
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.trail = this.trailService.activeTrail;
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
