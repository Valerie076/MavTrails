import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-media-modal',
  templateUrl: './media-modal.page.html',
  styleUrls: ['./media-modal.page.scss'],
  standalone: false,
})
export class MediaModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  closeModal(){
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }

}
