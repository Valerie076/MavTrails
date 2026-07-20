import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.page.html',
  styleUrls: ['./main-map.page.scss'],
  standalone: false,
})
export class MainMapPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl("login");
  }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)
  }

  ngOnInit() {
  }

}

