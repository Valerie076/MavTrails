import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { FirebaseService } from './firebase-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  selectedUser!: User

  private _users: BehaviorSubject<User[]> = new BehaviorSubject([] as
    User[])
  private firebaseObservable?: Subscription
  constructor(private firebaseService: FirebaseService) {
    this.getData()
  }
  getData() {
    try {
      this.firebaseService.readCollection("users").subscribe(
        res => {
          //map JSON from firebase to Users
          let users = res.map((user: any) => new
            User(user.id, user.profilePicture))
          //update BehaviorSubject to have newest Firebase values
          this._users.next(users)
        },
      )
    } catch (err) {
      console.log(err)
    }
  }
  get users(): Observable<User[]> {
    //turn behaviorSubject into observale we can subscribe to
    return this._users.asObservable()
  }
  async saveUser(user: User) {

    await this.firebaseService.createDoc(user, `users/${user.id}`)
    console.log("save it");
    
  }
  async deleteUser(user: User) {
    await this.firebaseService.deleteDoc(`users/${user.id}`)
  }
  ngOnDestroy() {
    this.firebaseObservable?.unsubscribe()
  }
}
