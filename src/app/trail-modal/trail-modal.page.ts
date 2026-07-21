import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-trail-modal',
  templateUrl: './trail-modal.page.html',
  styleUrls: ['./trail-modal.page.scss'],
  standalone: false
})
export class TrailModalPage implements OnInit {
  constructor(
    private modalCtrl: ModalController) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }


  ngOnInit() {
  }


}


