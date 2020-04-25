import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  user: User = {
    name: "Test Test",
    photoUrl: "https://lh3.googleusercontent.com/a-/AOh14GhzALiBI_3zL0U9QaC3AM9Rtm2i1iwVRYyQSU-9XA",
  }

  constructor(private router: Router, private loginService: LoginService) { }

  async ngOnInit() {
    try {
      this.user = await this.loginService.getLoggedUser()
      console.log(this.user)
    } catch (error) {
    }
  }

  logout() {
    this.loginService.logout()
  }

  goToAddFriends() {
    this.router.navigateByUrl('tabs/profile/friends-list')
  }
}
