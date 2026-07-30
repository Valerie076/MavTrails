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
import { FirebaseService } from '../services/firebase-service';

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

  types = MediaType

  mediaLoaded: boolean = false;
  mediaDict: Record<string, User> = {
  }

  postedBy: User = new User("ur mom", "MeruniPoopyButt", "https://thumbs.dreamstime.com/b/surprised-shocked-funny-bird-close-up-frame-highlighting-exaggerated-meme-worthy-facial-expressions-professional-photo-369144049.jpg", "402-676-67676")

  constructor(
    private trailService: TrailService,
    private router: Router,
    private modalService: ModalService,
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.trail = this.trailService.activeTrail;    

    if (this.trail.uid) {
      const trailUser = await this.userService.getDataOnce(this.trail.uid);
      if (trailUser) {
        this.postedBy = trailUser[0] as User;
      }
    }

    await Promise.all(
      this.trail.media.map(async media => {
        const mediaUser = await this.userService.getDataOnce(media.uid);

        if (mediaUser) {
          this.mediaDict[media.uid] = mediaUser[0] as User;
        }
      })
    );

    this.mediaLoaded = true;

    this.average = Math.round(this.trailService.getAverageRating(this.trail) * 10) / 10;
  }

  getDifficulty(trail: Trail) {
    return this.trailService.getDifficulty(trail);
  }

  getStars(trail: Trail): string[] {
    return this.trailService.getStars(trail);
  }

  // getUser(uid: string) {
  //   console.log("hi");

  //   return this.mediaDict[uid];
  // }

  // getUserImage(uid: string) {
  //   return this.getUser(uid).profilePicture;
  //   // this.getUser(uid).then((user) => {
  //   //   const u: User = user as User;
  //   //   return u.profilePicture;
  //   // });
  // }

  // getUserName(uid: string) {
  //   return this.getUser(uid).username;
  //   // this.getUser(uid).then((user) => {
  //   //   const u: User = user as User;
  //   //   return u.username;
  //   // });
  // }

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
