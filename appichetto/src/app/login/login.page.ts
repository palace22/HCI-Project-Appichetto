import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loadingUser: boolean = true

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginService.getLoadingUser().subscribe(isLoading => {
      this.loadingUser = isLoading
      console.log(isLoading)
    })
    this.loginService.getFirebaseLoggedUser().then(user => {
      if (user) {
        this.loginService.verifyUser(user)
        this.router.navigateByUrl('tabs/status');
      } else {
        this.loadingUser = false
      }
    })
  }

  login() {
    this.loginService.login()
  }

  logout() {
    this.loginService.logout()
    this.loadingUser = false
  }

}
