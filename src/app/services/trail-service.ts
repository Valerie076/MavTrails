import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, firstValueFrom, first } from 'rxjs';
import { FirebaseService } from './firebase-service';
import { Trail } from '../models/trail';
import { LatLngExpression } from 'leaflet';
import { Coordinate } from '../models/coordinate';
import { UserService } from './user-service';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class TrailService {
  activeTrail!: Trail

  newTrailPath: LatLngExpression[] = [];

  private _trails: BehaviorSubject<Trail[]> = new BehaviorSubject([] as
    Trail[])
  private firebaseObservable?: Subscription
  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
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
              trail.uid,
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
  async getDataOnce(uid: string): Promise<Object[] | undefined> {
    return this.firebaseService.readCollectionByUid('trails', uid)
      .pipe(first())
      .toPromise()
      .then(data => {
        return data;
      })
  }
  async saveTrail(trail: Trail) {
    await this.firebaseService.createDoc(trail, `trails`)
  }
  async updateTrail(trail: Trail) {
    await this.firebaseService.updateDoc(trail, `trails/${trail.id}`);
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
    // trailNoPath.uid = 

    this.saveTrail(trailNoPath);
  }

  getAverageRating(trail: Trail): number {
    const ratingsNums = trail.ratings.map(item => Number(item))
    const sum = ratingsNums.reduce((accumulator, current) => accumulator + current, 0);
    return sum * 10 / ratingsNums.length / 10;
  }

  getDifficulty(trail: Trail): string[] {
    const difficulty: string = trail.difficulty;
    
    const icons: string[] = [];

    switch (difficulty) {
      case "very": {
        icons.push("flame");
        for (let i = 0; i < 4; i++) {
          icons.push("flame-outline");
        }
        break;
      }
      case "easy": {
        for (let i = 0; i < 2; i++) {
          icons.push("flame");
        }
        for (let i = 0; i < 3; i++) {
          icons.push("flame-outline");
        }
        break;
      }
      case "medium": {
        for (let i = 0; i < 3; i++) {
          icons.push("flame");
        }
        for (let i = 0; i < 2; i++) {
          icons.push("flame-outline");
        }
        break;
      }
      case "hard": {
        for (let i = 0; i < 4; i++) {
          icons.push("flame");
        }
        icons.push("flame-outline");
        break;
      }
      case "master": {
        for (let i = 0; i < 5; i++) {
          icons.push("flame");
        }
        break;
      }
    }

    return icons;
  }

  getStars(trail: Trail): string[] {
    let rating: number = this.getAverageRating(trail);

    const stars: string[] = [];

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }

    if (hasHalfStar) {
      stars.push('half');
    }

    while (stars.length < 5) {
      stars.push('empty');
    }

    return stars;
  }
}
