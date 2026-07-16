import { Component, OnInit } from '@angular/core';
import { User as FirebaseUser, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service';
import { ErrorService } from 'src/app/services/error-service';
import { ModalService } from 'src/app/services/modal-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent  implements OnInit {
  regEmailIn: string = "";
  regPasswordIn: string = "";
  regPasswordConfIn: string = "";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: ModalService,
    private errorService: ErrorService,
    private router: Router
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.modalService.dismiss()
  }

  async register() {
    try {
      let result = await this.authService.register(this.regEmailIn, this.regPasswordIn, this.regPasswordConfIn);
  
      if (result != null) {
        this.dismissModal();
        this.createUser(result.user);
        this.router.navigateByUrl("home");
      } else {
        // this.errorService.createAlert("Error", "Failed to register.");
        this.clearPasswords();
      }
    } catch (err: any) {
      this.errorService.createAlert("Error", err.message);
    }
  }

  createUser(user: FirebaseUser) {
    let newUser = new User(user.uid, "", "");
    this.userService.saveUser(newUser);
  }

  clearFields() {
    this.regEmailIn = "";
    this.clearPasswords();
  }
  
  clearPasswords() {
    this.regPasswordIn = "";
    this.regPasswordConfIn = "";
  }

  eventHandlerReg(keyCode: number) {
    if (keyCode === 13) {
      // Pressed ENTER
      this.register()
    }
  }

  // validateEntry(): boolean {
  //   if (this.username == "" || this.email == "" || this.phone == "" || this.profilePicture == "") {
  //     this.errorService.createAlert("Must fill out all fields", "")
  //     return false
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(this.email)) {
  //     this.errorService.createAlert("Not an email address", "")
  //     return false;
  //   }

  //   const phoneRegex = /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;
  //   if (!phoneRegex.test(this.phone)) {
  //     this.errorService.createAlert("Not a phone number", "")
  //     return false;
  //   }

  //   const urlRegex = /^https?:\/\/(?:[\w-]+\.)+[\w-]{2,}(?:\/[^\s]*)?$/;
  //   if (!urlRegex.test(this.profilePicture)) {
  //     this.errorService.createAlert("Not a URL", "")
  //     return false;
  //   }

  //   return true
  // }

}
