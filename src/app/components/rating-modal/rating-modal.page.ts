import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TrailService } from 'src/app/services/trail-service';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.page.html',
  styleUrls: ['./rating-modal.page.scss'],
  standalone: false
})
export class RatingModalPage implements OnInit {

  value: number = 0

  constructor(private modalCtrl: ModalController,
    private trailService: TrailService,
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onRatingChange(event: any) {
    // Capture the selected value from the event detail
    const selectedValue = event.detail.value;

    console.log('selected:', selectedValue);
    this.saveRating(selectedValue)
  }

  saveRating(value: number) {
    this.trailService.activeTrail.ratings.push(value)
    console.log('saved:', value)
  }

  closeRatings() {
    this.trailService.updateTrail(this.trailService.activeTrail)
    this.closeModal()
  }



  ngOnInit() {
  }

}
