import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MediaType } from 'src/app/enums/media-type';
import { Media } from 'src/app/models/media';
import { TrailService } from 'src/app/services/trail-service';
import { UserService } from 'src/app/services/user-service';

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
    private trailService: TrailService,
    private userService: UserService
  ) { }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveMedia() {
    this.closeModal();

    let media = new Media(
      this.userService.activeUser.id,
      this.title,
      this.creator,
      this.type,
      this.description
    )

    this.trailService.activeTrail.media.push(media);
    
    this.trailService.updateTrail(this.trailService.activeTrail);
  }

  ngOnInit() {
  }

}
