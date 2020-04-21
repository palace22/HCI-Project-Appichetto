import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserFriends } from '../models/user-friends';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFriendsRepositoryService {
  userFriendsCollection: AngularFirestoreCollection<UserFriends>
  userFriendsDoc: AngularFirestoreDocument<UserFriends>
  userFriends: Observable<UserFriends>

  constructor(private firestore: AngularFirestore) {
    this.userFriendsCollection = this.firestore.collection(environment.firebaseDB.user_friends) as AngularFirestoreCollection<UserFriends>
  }

  setLoggedUser(userId: string) {
    this.userFriendsDoc = this.userFriendsCollection.doc(userId) as AngularFirestoreDocument<UserFriends>
    this.userFriends = this.userFriendsDoc.valueChanges()
  }

  getUserFriends(): Observable<UserFriends> {
    return this.userFriends
  }

  updateUserFriends(userId: string, userFriends: UserFriends) {
    this.userFriendsDoc = this.userFriendsCollection.doc(userId)
    this.userFriendsDoc.update(userFriends)
  }
}
