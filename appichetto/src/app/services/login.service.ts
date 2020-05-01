import { Injectable, NgZone, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { User } from '../models/user';
import { GoogleLoggedUserPipe } from '../pipe/google-logged-user.pipe';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { first } from 'rxjs/operators';
import { UserFriendsRepositoryService } from '../repositories/user-friends-repository.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  googleProvider: auth.GoogleAuthProvider
  loadingUser = new EventEmitter<boolean>()

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private userRepository: UserRepositoryService,
    private userFriendRepository: UserFriendsRepositoryService,
    private googleLoggedUserPipe: GoogleLoggedUserPipe,
  ) {
    this.loadingUser.emit(true)
    this.googleLoggedUserPipe = new GoogleLoggedUserPipe()
  }

  async login() {
    this.ngZone.run(async () => {
      this.googleProvider = new auth.GoogleAuthProvider()
      await this.angularFireAuth.signInWithRedirect(this.googleProvider)
    })
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.loadingUser.emit(false)
      this.router.navigateByUrl('login');
    })
  }

  async getLoggedUser(): Promise<User> {
    let user: firebase.User = await this.angularFireAuth.authState.pipe(first()).toPromise()
    return this.googleLoggedUserPipe.transform(user)
  }

  async getFirebaseLoggedUser(): Promise<firebase.User> {
    let user: firebase.User = await this.angularFireAuth.authState.pipe(first()).toPromise()
    return user
  }

  getLoadingUser() {
    return this.loadingUser
  }

  verifyUser(user: firebase.User) {
    if (user) {
      let loggedUser = this.googleLoggedUserPipe.transform(user)
      this.userRepository.userExists(loggedUser.email).then(exists => {
        if (!exists) {
          this.userRepository.addUser(loggedUser)
          this.userFriendRepository.initialize(loggedUser.email)
        }
      })
    } else {
      this.loadingUser.emit(false)
      console.log("There's no user here");
    }
  }

}
