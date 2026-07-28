import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile-modal.component.html',
  styleUrls: ['./update-profile-modal.component.scss'],
  standalone: false,
})
export class UpdateProfileComponent implements OnInit {

  usernameIn: string = ""
  phoneIn: string = ""
  profilePictureIn: string = ""

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService

  ) { }

  // async submitUpdate () {
  //   try {
  //     let updateProfileAdd = 
  //   }
  // }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  saveProfile() {
    this.closeModal();

    this.userService.activeUser.username = this.usernameIn
    this.userService.activeUser.phone = this.phoneIn
    this.userService.activeUser.profilePicture = this.profilePictureIn

    let user = this.userService.activeUser;
    console.log(user);
    this.userService.updateUser(user);
  }

  ngOnInit() { }

}
