import { Injectable } from '@angular/core';
import { Firestore, DocumentReference, doc, setDoc, CollectionReference, collection, collectionData, deleteDoc, addDoc, Query, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private firestore: Firestore
  ) { }
  /**
  * Create
  * path should follow the format "collectionName/documentName"
  * creates (or updates) a single document in firebase db
  **/
  // TODO - Make it add Doc
  async createDoc<T extends Object>(objectToStore: T, collectionName: string) {
    let collectionRef: CollectionReference = collection(this.firestore, collectionName)
    await addDoc(collectionRef, JSON.parse(JSON.stringify(objectToStore)))
  }
  async createDocWithSpecficId<T extends Object>(updatedObject: T, path: string) {
    // we can do this because update doc uses set doc :)
    await this.updateDoc(updatedObject, path)
  }
  /**
  * Read
  * Reads an entire firebase collection and returns the
  * result as an observable of the provided type
  **/
  readCollection<T extends Object>(collectionName: string):
    Observable<T[]> {
    let collectionRef: CollectionReference = collection(this.firestore,
      collectionName)
    return collectionData(collectionRef, { idField: "id" }) as Observable<T[]>
  }

  readCollectionByUid<T extends Object>(collectionName: string, uid: string):
    Observable<T[]> {
    let collectionRef: CollectionReference = collection(this.firestore, collectionName)
    let q: Query = query(collectionRef, where('id', '==', uid))
    return collectionData(q) as Observable<T[]>;
  }
  /**
  * Update
  * path should follow the format "collectionName/documentName"

  * creates (or updates) a single document in firebase db.
  * Mostly here as a placeholder if a custom update function is needed
  **/
  async updateDoc<T extends Object>(updatedObject: T, path: string) {
    let documentRef: DocumentReference = doc(this.firestore, path);
    await setDoc(documentRef, JSON.parse(JSON.stringify(updatedObject)))
  }
  /**
  * Delete
  * path should follow the format "collectionName/documentName"
  * deletes a single document in firebase db
  **/
  async deleteDoc(path: string) {
    let documentRef: DocumentReference = doc(this.firestore, path);
    await deleteDoc(documentRef)
  }
}
