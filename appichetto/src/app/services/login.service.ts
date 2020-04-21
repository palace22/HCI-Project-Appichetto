import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase'
import { Router } from '@angular/router';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { GoogleLoggedUserPipe } from '../pipe/google-logged-user.pipe';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  googleProvider: auth.GoogleAuthProvider
  loggedUser: firebase.User

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private userRepository: UserRepositoryService,
    private googleLoggedUserPipe: GoogleLoggedUserPipe,
  ) {
    this.googleProvider = new auth.GoogleAuthProvider
    this.googleLoggedUserPipe = new GoogleLoggedUserPipe()
    this.angularFireAuth.authState.subscribe(user => this.loggedUser = user)
  }

  async login() {
    this.angularFireAuth.signInWithPopup(this.googleProvider).then(async (result) => {
      let googleLoggedUser = result.user
      this.userRepository.userExists(googleLoggedUser.email).then(result => {
        console.log(this.getLoggedUser())
        console.log(this.getUser())
        if (!result)
          this.userRepository.addUser(this.googleLoggedUserPipe.transform(googleLoggedUser))
        this.ngZone.run(() => {
          this.router.navigateByUrl('tabs/profile');
        })
      })
    })
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.router.navigateByUrl('login');
    })
  }

  getLoggedUser(): firebase.User {
    return this.loggedUser
  }

  getUser() {
    return this.angularFireAuth.currentUser
  }

  getLogUser() {
    return this.angularFireAuth.authState
  }

}
