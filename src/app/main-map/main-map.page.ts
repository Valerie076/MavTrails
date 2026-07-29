import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { TrailService } from '../services/trail-service';
import { Trail } from '../models/trail';
import { Coordinate } from '../models/coordinate';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal-service';
import { AuthService } from '../services/auth-service';
import { TrailModalPage } from '../components/trail-modal/trail-modal.page';

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

      L.marker(latlng[0]).addTo(this.map)
        .bindPopup(trail.name)
        .bindTooltip(trail.name)
        .addEventListener('click', (e) => this.openTrailDetails(trail))
        .openPopup()

      polyline.bindTooltip(trail.name)
        .addEventListener('click', (e) => this.openTrailDetails(trail))
    }
  }

  navigatePage(path: string) {
    this.router.navigateByUrl(path)
  }

  openTrailDetails(trail: Trail) {
    this.trailService.activeTrail = trail;
    this.navigatePage("details");
  }

  onClick(e: L.LeafletMouseEvent, newPath: L.LatLngExpression[]) {
    if (!this.creatingTrail) {
      return;
    }

    let mousePos = e.latlng;

    newPath.push([mousePos.lat, mousePos.lng]);

    L.polyline(newPath, {
      color: 'blue',
      weight: 5,
      opacity: 0.7
    }).addTo(this.map);

  }

  createTrail() {
    let newPath: L.LatLngExpression[] = [];
    this.trailService.newTrailPath = newPath;

    this.creatingTrail = true;

    this.map.on('click', (e) => {
      this.onClick(e, newPath);
    });
  }

  endTrail() {
    this.creatingTrail = false;

    this.map.off('click');

    if (this.trailService.newTrailPath.length > 0) {
      this.openTrailModal();
    }
  }

  async openTrailModal() {
    this.modalService.createModal(TrailModalPage);
  }

  async logout() {
    await this.authService.logout();
    this.navigatePage("login");
  }
}

