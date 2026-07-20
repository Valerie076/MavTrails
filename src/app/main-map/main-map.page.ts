import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { TrailService } from '../services/trail-service';
import { Trail } from '../models/trail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.page.html',
  styleUrls: ['./main-map.page.scss'],
  standalone: false,
})
export class MainMapPage implements OnInit {
  map!: L.Map

  creatingTrail: boolean = false;
  globalNewPath: L.LatLngExpression[] = []; // Place for the path to be saved.

  constructor(
    private trailService: TrailService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.map = L.map('map').setView([41.2516656, -96.0097386], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([41.2516656, -96.0097386]).addTo(this.map)
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
    }).addTo(this.map);

  }

  ngOnInit() {
  }

  navigatePage(path: string) {
this.router.navigateByUrl(path)
  }

  onClick(e: L.LeafletMouseEvent, newPath: L.LatLngExpression[]) {
    if (!this.creatingTrail) {
      return;
    }

    let mousePos = e.latlng;
    // console.log(mousePos);

    newPath.push([mousePos.lat, mousePos.lng]);

    const polyline = L.polyline(newPath, {
      color: 'blue',
      weight: 5,
      opacity: 0.7
    }).addTo(this.map);

  }

  createTrail() {
    let newPath: L.LatLngExpression[] = [];
    this.globalNewPath = newPath;

    this.creatingTrail = !this.creatingTrail;

    this.map.on('click', (e) => {
      this.onClick(e, newPath);
    });
  }

  endTrail() {
    this.map.off('click');

    console.log(this.globalNewPath);

  }

  saveTrail() {
    for (let coord in this.globalNewPath) {
      
    }

    this.trailService.saveTrail(
      new Trail(
        this.globalNewPath as number[][],
        0,
        "insert difficulty",
        [],
        "location",
        0,
        "Description",
        [],
        [],
        [],
        []
      )
    );

    this.endTrail();
  }
}

