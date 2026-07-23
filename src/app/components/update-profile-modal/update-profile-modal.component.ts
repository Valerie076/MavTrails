import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.scss'],
  standalone: false,
})
export class UpdateProfileComponent implements OnInit {

 updateEmailIn: string = ""
 updatePhoneIn: string = ""
 updateUsernameIn: string = ""
 updatePasswordIn: string = ""
 updatePicIn: string = ""

  constructor(
    private modalCtrl: ModalController

  ) { }

  // async submitUpdate () {
  //   try {
  //     let updateProfileAdd = 
  //   }
  // }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() { }

}
