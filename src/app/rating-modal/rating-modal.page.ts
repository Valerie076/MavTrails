import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.page.html',
  styleUrls: ['./rating-modal.page.scss'],
  standalone: false
})
export class RatingModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  closeModal (){
    this.modalCtrl.dismiss();
  }
  ngOnInit() {
  }

}
