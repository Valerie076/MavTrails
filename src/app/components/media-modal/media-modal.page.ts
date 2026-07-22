import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MediaType } from 'src/app/enums/media-type';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.page.html',
  styleUrls: ['./media-modal.page.scss'],
  standalone: false,
})
export class MediaModalPage implements OnInit {
  // Podcast, Audiobook, Music, Picture
  // picture in carousel
  // podcast, music, playlist, audiobook as individual cards
  mediaTypes = Object.keys(MediaType).filter(key => isNaN(Number(key)));

  constructor(private modalCtrl: ModalController) { }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

}
