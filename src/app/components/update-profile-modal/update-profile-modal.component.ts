import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';

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

  saveProfile() {
      let profile = new User(
        "insert user id here when it loads lmao",
        this.updateEmailIn,
        this.updatePhoneIn,
        this.updateUsernameIn,
        this.updatePasswordIn,
        this.updatePicIn,
        
      )
  
      let user = this.userService.activeUser;
  
      console.log(user);
      
  
      user.profile.push(profile);
  
      this.userService.updateUser(user);
    }

  ngOnInit() { }

}
