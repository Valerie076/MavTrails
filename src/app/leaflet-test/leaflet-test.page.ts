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

   const latlngs: L.LatLngExpression[] = [
  [41.248867, -96.015685
],
  [41.249723, -96.015048],
  [41.250348, -96.014298],
  [41.25133, -96.013869],
  [41.25133, -96.013246],
  [41.252414, -96.012174],
  [41.253079, -96.010365],
  [41.254071, -96.008905],
  [41.255325, -96.007344]
];

// 4. Create the polyline and add it to the map
const polyline = L.polyline(latlngs, {
  color: 'blue',
  weight: 5,
  opacity: 0.7
}).addTo(map);
  }
  ngOnInit() {
  }

}
