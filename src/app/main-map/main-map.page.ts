import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.page.html',
  styleUrls: ['./main-map.page.scss'],
  standalone: false,
})
export class MainMapPage implements OnInit {

  constructor(private router: Router) { }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)
  }

  ngOnInit() {
  }

}

