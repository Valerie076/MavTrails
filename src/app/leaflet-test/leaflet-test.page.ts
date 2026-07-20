import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'

@Component({
  selector: 'app-leaflet-test',
  templateUrl: './leaflet-test.page.html',
  styleUrls: ['./leaflet-test.page.scss'],
  standalone: false,
})
export class LeafletTestPage implements OnInit {


  
  constructor() { }

ionViewWillEnter() {
  var map = L.map('map').setView([41.2516656, -96.0097386], 15);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([41.2516656, -96.0097386]).addTo(map)
    .bindPopup('New Recommendation: <br> Elmwood Park Trail')
    .openPopup();
}
  ngOnInit() {
  }

}
