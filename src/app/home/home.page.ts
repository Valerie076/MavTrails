import { Component } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  onFileSelected(event: any) {
  const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const gpsData = e.target.result;
      console.log('Uploaded GPS File Content:', gpsData);
    };
    reader.readAsText(file);
  }
}


  constructor() {}

}
