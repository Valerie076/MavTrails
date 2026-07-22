import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.scss'],
  standalone: false,
})
export class UpdateProfileComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController

  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }

}
