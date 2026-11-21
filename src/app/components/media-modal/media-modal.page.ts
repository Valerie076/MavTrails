import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MediaType } from 'src/app/enums/media-type';
import { Media } from 'src/app/models/media';
import { ErrorService } from 'src/app/services/error-service';
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
    private userService: UserService,
    private errorService: ErrorService
  ) { }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  saveMedia() {
    if (!this.validateEntries()) {
      return;
    }

    this.closeModal();

    let media = new Media(
      this.userService.activeUser.id,
      this.title,
      this.creator,
      this.type,
      this.description,
      this.url
    )

    this.trailService.activeTrail.media.push(media);
    
    this.trailService.updateTrail(this.trailService.activeTrail);
  }

  ngOnInit() {
  }

  validateEntries(): boolean {
    if (this.title == "") {
      this.errorService.createAlert("Invalid Entry", "Media title cannot be empty.");
      return false;
    }
    if (this.type == undefined) {
      this.errorService.createAlert("Invalid Entry", "Media type must be set.");
      return false;
    }
    if (this.url == "") {
      this.errorService.createAlert("Invalid Entry", "Media URL cannot be empty.");
      return false;
    }
    if (this.creator == "") {
      this.errorService.createAlert("Invalid Entry", "Media creator cannot be empty.");
      return false;
    }
    if (this.description == "") {
      this.errorService.createAlert("Invalid Entry", "Media description cannot be empty")
      return false;
    }

    return true;
  }

}
