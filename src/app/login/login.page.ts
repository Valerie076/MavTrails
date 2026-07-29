import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { ErrorService } from '../services/error-service';
import { ModalService } from '../services/modal-service';
import { RegisterComponent } from '../components/register/register.component';
import { User as FirebaseUser } from '@angular/fire/auth';
import { UserService } from '../services/user-service';
import { Subscription } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  userSubscription?: Subscription;

  emailIn: string = "";
  passwordIn: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService,
    private modalServcie: ModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
  }

  ionViewWillEnter() {
    this.clearFields();
  }

  async login() {
    let result = await this.authService.login(this.emailIn, this.passwordIn);

    if (result != null) {
      this.loginUser(result.user);
      this.router.navigateByUrl("home");
      // TODO - LOAD USER
    } else {
      this.errorService.createAlert("Error", "Invalid credentials.")
      this.clearPasswords();
    }
  }

  loginUser(user: FirebaseUser) {
    this.userService.getData(user.uid);
    
    // this.userSubscription = this.userService.users.subscribe(
    //   (data: User[]) => {
    //     let newUser = this.userService.getUserByID(data, user.uid);
        
    //     this.userService.getData(user.uid);
        
    //     // let newUser = this.userService
    //     // let newUser = this.userService.getData(user.uid);
    //     if (newUser) {
    //       this.userService.activeUser = newUser;
    //     }
    //     else {
    //       this.errorService.createAlert("Error", "Could not find the user. Please try again.")
    //     }
    //   }
    // )
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
