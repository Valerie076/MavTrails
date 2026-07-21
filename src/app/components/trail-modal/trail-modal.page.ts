import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrailService } from 'src/app/services/trail-service';



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
    private trailService: TrailService
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  saveTrail() {
    this.trailService.saveTrailPath();
  }

}


