import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { plainToClass } from "class-transformer";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user: User = {
    name: "",
    photoUrl: "",
  }

  constructor(private router: Router, private loginService: LoginService) { }

  async ngOnInit() {
    try {
      let firebaseUser = await this.loginService.getUser()
      this.user = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoUrl: firebaseUser.photoURL
      }
    } catch (error) {
    }
  }


  logout() {
    this.loginService.logout()
  }

}
