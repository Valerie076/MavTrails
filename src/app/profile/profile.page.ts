import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../services/modal-service';
import { UpdateProfileComponent } from '../components/update-profile-modal/update-profile-modal.component';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  // userArray: User = new User()
  user!: User

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private modalService: ModalService,
    private userService: UserService,

  ) { }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)
  }

  navigateModal() {
    this.modalService.createModal(UpdateProfileComponent)
  }

  ngOnInit() {
    this.user = this.userService.activeUser
    console.log(this.userService.activeUser)
    console.log(this.user.profilePicture)
  }

}
