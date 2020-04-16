import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../repositories/user-repository.service';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: firebase.User;
  loggedUser: User

  constructor(
    private userRepo: UserRepositoryService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getLoggedUser()
      .subscribe(user => {
        this.user = user
        if (this.user !== null) {
          this.loggedUser = {
            name: this.user.displayName,
            photoUrl: this.user.photoURL
          }
          //this.router.navigateByUrl("tabs/profile", { state: { loggedUser: this.loggedUser } })
        }
      })
  }

  login() {
    this.loginService.login()
  }

  logout() {
    this.loginService.logout()
  }

}
