import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {
  usersCollection: AngularFirestoreCollection<User>
  userDoc: AngularFirestoreDocument<User>
  users: Observable<User[]>

  constructor(private firestore: AngularFirestore) {
    this.usersCollection = this.firestore.collection(environment.firebaseDB.users) as AngularFirestoreCollection<User>

    this.users = this.firestore.collection(environment.firebaseDB.users).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User
        const id = a.payload.doc.id
        return { id, ...data }
      }))
    )
    this.users.forEach(u => console.log(u))
  }

  addUser(user: User) {
    this.usersCollection.doc(user.name).set(user);
  }

  getUsers() {
    return this.firestore.collection(environment.firebaseDB.users).snapshotChanges();
  }

  getUser(id:string) {
    return this.firestore.collection(environment.firebaseDB.users).doc(id)
  }

  userUser(user: User) {
    this.userDoc = this.firestore.doc(`${environment.firebaseDB.users}&${user.id}`)
    this.userDoc.update(user)
  }

  deleteUser(user: User) {
    this.userDoc = this.firestore.doc(`${environment.firebaseDB.users}&${user.id}`)
    this.userDoc.delete()
  }
}
