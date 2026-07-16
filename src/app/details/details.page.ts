import { Component, OnInit } from '@angular/core';
import { Trail } from '../models/trail';
import { User } from '../models/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: false,
})
export class DetailsPage implements OnInit {
  detailsOne: Trail = new Trail(15, "Medium", [4, 3, 2], "blah blah blah", 40, "Fun", ["Lake", "Houses", "Gravel"])

  postedBy: User = new User("ur mom", "MeruniPoopyButt", "https://thumbs.dreamstime.com/b/surprised-shocked-funny-bird-close-up-frame-highlighting-exaggerated-meme-worthy-facial-expressions-professional-photo-369144049.jpg")

  constructor() { }

  ngOnInit() {
  }

}
