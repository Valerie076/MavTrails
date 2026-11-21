import { Injectable } from '@angular/core';
import { 
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
 } from '@angular/fire/auth';
import { ErrorService } from './error-service';
import { UserService } from './user-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(
    private auth: Auth,
    private errorService: ErrorService,
    private userService: UserService
  ) {
    this.auth.onAuthStateChanged(() => {
      // refresh user data, start subs, etc.
      // this will fire every time the page loads,
      // when users log in, and when they log out
      userService.reset();
      
      let uid = this.currentUserId;
      if (uid) {
        userService.getData(uid);
      }
    })
  }

  async register(email: string, password: string, passwordConf: string) {
    if (password != passwordConf) {
      throw new Error("Passwords do not match.");
    }

    try {
      let user = await createUserWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch(err: any) {
      let message = "Could not create user. Please try again.";

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

  get currentUserId(): string | undefined {
    return this.auth.currentUser?.uid;
  }
}
