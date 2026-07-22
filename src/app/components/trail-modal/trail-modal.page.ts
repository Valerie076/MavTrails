import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Trail } from 'src/app/models/trail';
import { TrailService } from 'src/app/services/trail-service';
import { UserService } from 'src/app/services/user-service';



@Component({
  selector: 'app-trail-modal',
  templateUrl: './trail-modal.page.html',
  styleUrls: ['./trail-modal.page.scss'],
  standalone: false
})
export class TrailModalPage implements OnInit {
  name: string = "";
  location: string = "";
  description: string = "";

  constructor(
    private modalCtrl: ModalController,
    private trailService: TrailService,
    private userService: UserService
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  saveTrail() {
    let trailNoPath: Trail = new Trail(
      [],
      this.name,
      0,
      "",
      [],
      this.location,
      0,
      this.description,
      [],
      [],
      this.userService.activeUser.id
    )
    this.trailService.saveTrailPath(trailNoPath);
    this.closeModal();
  }

}


