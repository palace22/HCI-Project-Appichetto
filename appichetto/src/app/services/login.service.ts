import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  googleProvider: auth.GoogleAuthProvider
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone,

  ) {
    this.googleProvider = new auth.GoogleAuthProvider
  }

  login() {
    this.angularFireAuth.signInWithPopup(this.googleProvider).then((result) => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('tabs/profile');
      })
      console.log(result.user)
    })
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.router.navigateByUrl('login');
    })
  }

  getLoggedUser() {
    return this.angularFireAuth.authState
  }

  async getUser(){
    return await this.angularFireAuth.currentUser
  }

}
