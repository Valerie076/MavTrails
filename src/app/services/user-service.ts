import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject, Subscription, Observable, first } from 'rxjs';
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
          //map JSON from firebase to Users
          let users = res.map((user: any) => new
            User(user.id, user.username, user.profilePicture, user.phone))
          //update BehaviorSubject to have newest Firebase values
          this._users.next(users)
          this.activeUser = users[0]
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
  async getDataOnce(uid: string): Promise<Object[] | undefined> {
      return this.firebaseService.readCollectionByUid('users', uid)
          .pipe(first())
          .toPromise()
          .then(data => {
            return data;
          })
    }
  async saveUser(user: User) {
    await this.firebaseService.createDocWithSpecficId(user, `users/${user.id}`)
  }
  async deleteUser(user: User) {
    await this.firebaseService.deleteDoc(`users/${user.id}`)
  }

  async updateUser(user: User) {
      await this.firebaseService.updateDoc(user, `users/${user.id}`);
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
