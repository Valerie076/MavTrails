import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { FirebaseService } from './firebase-service';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  activeUser!: User

  private _users: BehaviorSubject<User[]> = new BehaviorSubject([] as
    User[])
  private firebaseObservable?: Subscription
  constructor(private firebaseService: FirebaseService,
    // private authService: AuthService
  ) {
    // let uid = authService.currentUserId;
    // if (uid) {
    //   this.getData(uid);
    // }
  }
  getData(uid: string) {
    try {
      this.firebaseService.readCollectionByUid("users", uid).subscribe(
        res => {
          console.log("get data");
          
          console.log(res);
          
          //map JSON from firebase to Users
          let users = res.map((user: any) => new
            User(user.id, user.username, user.profilePicture))
          //update BehaviorSubject to have newest Firebase values
          this._users.next(users)
          console.log("LOOKIE HERE");
          
          console.log(this._users);
          
        },
      )
    } catch (err) {
      console.error(err)
    }
  }
  get users(): Observable<User[]> {
    //turn behaviorSubject into observale we can subscribe to
    return this._users.asObservable()
  }
  async saveUser(user: User) {
    console.log("SAVIN USER");

    console.log(user.id);

    await this.firebaseService.createDocWithSpecficId(user, `users/${user.id}`)
    console.log("save it");

  }
  async deleteUser(user: User) {
    await this.firebaseService.deleteDoc(`users/${user.id}`)
  }

  reset() {
    if (this.firebaseObservable) {
      this.firebaseObservable.unsubscribe();
    }
    this._users.next([]);
  }

  ngOnDestroy() {
    if (this.firebaseObservable) {
      this.firebaseObservable?.unsubscribe()
    }
  }

  getUserByID(users: User[], uid: string): User | undefined {
    return users.find(user => user.id === uid);
  }
}
