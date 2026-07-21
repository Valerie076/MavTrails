import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {

  // userArray: User = new User()


  constructor(private router: Router) { }

  navigatePage(page: string) {
    this.router.navigateByUrl(page)
  }

  ngOnInit() {
  }

}
