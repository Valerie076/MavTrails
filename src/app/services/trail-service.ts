import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { FirebaseService } from './firebase-service';
import { Trail } from '../models/trail';

@Injectable({
  providedIn: 'root',
})
export class TrailService {
  activeTrail!: Trail

  private _trails: BehaviorSubject<Trail[]> = new BehaviorSubject([] as
    Trail[])
  private firebaseObservable?: Subscription
  constructor(private firebaseService: FirebaseService) {
    this.getData()
  }
  getData() {
    try {
      this.firebaseService.readCollection("trails").subscribe(
        res => {
          //map JSON from firebase to Users
          let trails = res.map((trail: any) => new
            Trail(
              trail.path,
              trail.length,
              trail.difficulty,
              trail.ratings,
              trail.location,
              trail.time,
              trail.description,
              trail.features,
              trail.music,
              trail.podcasts,
              trail.audiobooks,
              trail.id
            ))
          //update BehaviorSubject to have newest Firebase values
          this._trails.next(trails)
        },
      )
    } catch (err) {
      console.error(err)
    }
  }
  get trails(): Observable<Trail[]> {
    //turn behaviorSubject into observale we can subscribe to
    return this._trails.asObservable()
  }
  async saveTrail(trail: Trail) {

    await this.firebaseService.createDoc(trail, `trails`)
    console.log("save trail");
    
  }
  async deleteTrail(trail: Trail) {
    await this.firebaseService.deleteDoc(`trails/${trail.id}`)
  }
  ngOnDestroy() {
    this.firebaseObservable?.unsubscribe()
  }
}
