import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Trail } from 'src/app/models/trail';
import { AuthService } from 'src/app/services/auth-service';
import { ErrorService } from 'src/app/services/error-service';
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
  length!: number
  difficulty: string = ""
  time!: number

  selectedValues: [] = []

  constructor(
    private modalCtrl: ModalController,
    private trailService: TrailService,
    private userService: UserService,
    private authService: AuthService,
    private errorService: ErrorService
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
  }

  saveTrail() {
    if (!this.validateEntries()) {
      return;
    }

    let trailNoPath: Trail = new Trail(
      [],
      this.name,
      this.length,
      this.difficulty,
      [],
      this.location,
      this.time,
      this.description,
      this.selectedValues,
      [],
      this.authService.currentUserId
    )
    this.trailService.saveTrailPath(trailNoPath);
    this.closeModal();
  }

  validateEntries(): boolean {
    if (this.name == "") {
      this.errorService.createAlert("Invalid Entry", "Trail name cannot be empty.");
      return false;
    }
    if (this.location == "") {
      this.errorService.createAlert("Invalid Entry", "Trail location cannot be empty.");
      return false;
    }
    if (this.description == "") {
      this.errorService.createAlert("Invalid Entry", "Trail description cannot be empty.");
      return false;
    }
    if (this.selectedValues.length === 0) {
      this.errorService.createAlert("Invalid Entry", "Trail features cannot be empty.");
      return false;
    }
    if (this.difficulty.length === 0) {
      this.errorService.createAlert("Invalid Entry", "Trail difficulty cannot be empty")
      return false;
    }
    if (this.length == undefined || this.length.toString() == "") {
      this.errorService.createAlert("Invalid Entry", "Trail length cannot be empty")
      return false;
    }
    if (this.time == undefined || this.time.toString() == "") {
      this.errorService.createAlert("Invalid Entry", "Trail time cannot be empty")
      return false;
    }

    return true;
  }

}


