import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error-service';
import { ModalService } from '../services/modal-service';
import { RegisterComponent } from '../components/register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  emailIn: string = "";
  passwordIn: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService,
    private modalServcie: ModalService
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
      // TODO - LOAD USER
    } else {
      this.errorService.createAlert("Error", "Invalid credentials.")
      this.clearPasswords();
    }
  }

  clearFields() {
    this.emailIn = "";
    this.clearPasswords();
  }
  
  clearPasswords() {
    this.passwordIn = "";
  }

  eventHandler(keyCode: number) {
    if (keyCode === 13) {
      // Pressed ENTER
      this.login()
    }
  }

  presentRegister() {
    this.modalServcie.createModal(RegisterComponent)
  }
}
