import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { User } from '../models/user';
import { GoogleLoggedUserPipe } from '../pipe/google-logged-user.pipe';
import { UserRepositoryService } from '../repositories/user-repository.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  googleProvider: auth.GoogleAuthProvider

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,
    private userRepository: UserRepositoryService,
    private googleLoggedUserPipe: GoogleLoggedUserPipe,
  ) {

    this.googleProvider = new auth.GoogleAuthProvider()
    this.googleLoggedUserPipe = new GoogleLoggedUserPipe()
  }

  async login() {
    this.angularFireAuth.signInWithPopup(this.googleProvider).then((result) => {
      let loggedUser = this.googleLoggedUserPipe.transform(result.user)
      this.userRepository.userExists(loggedUser.email).then(exists => {
        if (!exists)
          this.userRepository.addUser(loggedUser)
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

  async getLoggedUser(): Promise<User> {
    let user: firebase.User = await this.angularFireAuth.currentUser
      return this.googleLoggedUserPipe.transform(user)
  }

}
