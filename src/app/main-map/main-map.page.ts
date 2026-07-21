import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { TrailService } from '../services/trail-service';
import { Trail } from '../models/trail';
import { Coordinate } from '../models/coordinate';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal-service';
import { TrailModalPage } from '../trail-modal/trail-modal.page';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.page.html',
  styleUrls: ['./main-map.page.scss'],
  standalone: false,
})
export class MainMapPage implements OnInit {
  trailSubscription?: Subscription;
  trails: Trail[] = [];

  map!: L.Map;

  creatingTrail: boolean = false;
  globalNewPath: L.LatLngExpression[] = []; // Place for the path to be saved.

  constructor(
    private trailService: TrailService,
    private router: Router,
    private modalService: ModalService,
    private authService: AuthService
  ) { }

  ionViewWillEnter() {

    this.map = L.map('map').setView([41.2516656, -96.0097386], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([41.2516656, -96.0097386]).addTo(this.map)
      .bindPopup('New Recommendation: <br> Elmwood Park Trail')
      .openPopup();

    // FETCH TASKS
    this.trailSubscription = this.trailService.trails.subscribe((data: Trail[]) => {
      this.trails = data;
      this.populateMap();
    });

  }

  ngOnInit() {
  }

  populateMap() {
    for (let trail of this.trails) {
      let latlng: L.LatLngExpression[] = [];

      let pathCoords = trail.path;
      for (let coord of pathCoords) {
        let a = L.latLng(coord.longitude, coord.latitude);
        latlng.push(a)
      }

      const polyline = L.polyline(latlng, {
        color: 'blue',
        weight: 5,
        opacity: 0.7
      }).addTo(this.map);

      polyline.bindTooltip('Edit').addEventListener('click', (e) => {
        console.log(polyline);
        
      })
    }
  }

  navigatePage(path: string) {
    this.router.navigateByUrl(path)
  }

  onClick(e: L.LeafletMouseEvent, newPath: L.LatLngExpression[]) {
    if (!this.creatingTrail) {
      return;
    }

    let mousePos = e.latlng;

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

    this.creatingTrail = true;

    this.map.on('click', (e) => {
      this.onClick(e, newPath);
    });
  }

  endTrail() {
    this.creatingTrail = false;

    this.map.off('click');

    if (this.globalNewPath.length > 0) {
      this.openTrailModal();
    }
  }

  async openTrailModal() {
    this.modalService.createModal(TrailModalPage);
  }

  saveTrail() {
    let coords: Coordinate[] = [];

    for (let coord of this.globalNewPath) {
      let coordNum = coord as number[];

      coords.push(
        new Coordinate(coordNum[0], coordNum[1])
      );
    }

    this.trailService.saveTrail(
      new Trail(
        coords,
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
  }

  async logout() {
    await this.authService.logout();
    this.navigatePage("login");
  }
}

