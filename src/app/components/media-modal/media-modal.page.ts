import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MediaType } from 'src/app/enums/media-type';
import { Media } from 'src/app/models/media';
import { TrailService } from 'src/app/services/trail-service';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.page.html',
  styleUrls: ['./media-modal.page.scss'],
  standalone: false,
})
export class MediaModalPage implements OnInit {
  title: string = "";
  type!: MediaType
  creator: string = "";
  url: string = "";
  description: string = "";

  // Podcast, Audiobook, Music, Picture
  // picture in carousel
  // podcast, music, playlist, audiobook as individual cards
  mediaTypes = Object.keys(MediaType).filter(key => isNaN(Number(key)));

  constructor(
    private modalCtrl: ModalController,
    private trailService: TrailService
  ) { }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveMedia() {
    let media = new Media(
      "insert user id here when it loads lmao",
      this.title,
      this.creator,
      this.type,
      this.description,
      "ID"
    )

    let trail = this.trailService.activeTrail;
    
    trail.media.push(media);

    this.trailService.updateTrail(trail);
  }

  ngOnInit() {
  }

}
