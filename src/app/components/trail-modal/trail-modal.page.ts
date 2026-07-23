import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Trail } from 'src/app/models/trail';
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
  length!: number
  difficulty: string = ""
  time!: number

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
    let trailNoPath: Trail = new Trail(
      [],
      this.name,
      this.length,
      this.difficulty,
      [],
      this.location,
      this.time,
      this.description,
      [],
      [],
      [],
      []
    )
    this.trailService.saveTrailPath(trailNoPath);
    this.closeModal();
  }

}


