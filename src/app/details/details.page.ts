import { Component, OnInit } from '@angular/core';
import { Trail } from '../models/trail';
import { User } from '../models/user';
import { Music } from '../models/music';
import { Podcast } from '../models/podcast';
import { Audiobook } from '../models/audiobook';
import { MusicType } from '../enums/music-type';
import { Subscription } from 'rxjs';
import { TrailService } from '../services/trail-service';
import { Router } from '@angular/router';

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

  // music: Music[] = [
  //   new Music("uhseifah", "Music Title", "Artist", MusicType.Playlist)
  // ];
  // podcasts!: Podcast[];
  // audiobook!: Audiobook[];
  
  // detailsOne: Trail = new Trail("", 15, "Medium", [4, 3, 2], "blah blah blah", 40, "Fun", ["Lake", "Houses", "Gravel"], [], [], [])

  postedBy: User = new User("ur mom", "MeruniPoopyButt", "https://thumbs.dreamstime.com/b/surprised-shocked-funny-bird-close-up-frame-highlighting-exaggerated-meme-worthy-facial-expressions-professional-photo-369144049.jpg")

  constructor(
    private trailService: TrailService,
    private router: Router
  ) { }

  ngOnInit() {
    this.trail = this.trailService.activeTrail;
  }

  navigatePage(path: string) {
    this.router.navigateByUrl(path);
  }
}
