import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { FirebaseService } from './firebase-service';
import { Trail } from '../models/trail';
import { LatLngExpression } from 'leaflet';
import { Coordinate } from '../models/coordinate';

@Injectable({
  providedIn: 'root',
})
export class TrailService {
  activeTrail!: Trail

  newTrailPath: LatLngExpression[] = [];

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
              trail.name,
              trail.length,
              trail.difficulty,
              trail.ratings,
              trail.location,
              trail.time,
              trail.description,
              trail.features,
              trail.media,
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

  saveTrailPath(trailNoPath: Trail) {
    let coords: Coordinate[] = [];

    for (let coord of this.newTrailPath) {
      let coordNum = coord as number[];

      coords.push(
        new Coordinate(coordNum[0], coordNum[1])
      );
    }

    trailNoPath.path = coords;

    this.saveTrail(trailNoPath);
  }
}
