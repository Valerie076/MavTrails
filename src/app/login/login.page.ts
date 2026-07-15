import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  emailIn: string = "";
  passwordIn: string = "";

  regEmailIn: string = "";
  regPasswordIn: string = "";
  regPasswordConfIn: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.clearFields();
  }

  async login() {
    let result = await this.authService.login(this.emailIn, this.passwordIn);

    if (result != null) {
      this.router.navigateByUrl("home");
    } else {
      // TODO - show error with error service
      this.clearPasswords();
    }
  }

  async register() {
    try {
      let result = await this.authService.register(this.regEmailIn, this.regPasswordIn, this.regPasswordConfIn);
  
      if (result != null) {
        this.router.navigateByUrl("home");
      } else {
        // TODO - show error with error service err.message
        this.clearPasswords();
      }
    } catch (err: any) {
      // TODO - show error with error service err.message
    } finally {
      this.clearFields();
    }
  }

  clearFields() {
    this.emailIn = "";
    this.regEmailIn = "";
    this.clearPasswords();
  }
  
  clearPasswords() {
    this.passwordIn = "";
    this.regPasswordIn = "";
    this.regPasswordConfIn = "";
  }


}
