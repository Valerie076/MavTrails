import { Injectable } from '@angular/core';
import { 
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
 } from '@angular/fire/auth';
import { ErrorService } from './error-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(
    private auth: Auth,
    private errorService: ErrorService
  ) { }

  async register(email: string, password: string, passwordConf: string) {
    if (password != passwordConf) {
      throw new Error("Passwords do not match.");
    }

    try {
      let user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch(err: any) {
      let message = "Could not create user.";

      if (err.message.indexOf("invalid-email") !== -1) {
        message = "Invalid email address.";
      } else if (err.message.indexOf("weak-password") !== -1) {
        message = "Password must be at least 6 characters.";
      } else if (err.message.indexOf("email-already-in-use") !== -1) {
        message = "This email is already registered.";
      } else if (err.message.indexOf("missing-password") !== -1) {
        message = "Password cannot be empty."
      }
      
      this.errorService.createAlert("Error", message);
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      let user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch(err: any) {
      return null;
    }
  }

  async logout() {
    return signOut(this.auth);
  }
}
