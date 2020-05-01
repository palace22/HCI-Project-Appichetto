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
        console.log(user)
        this.loginService.verifyUser(user)
        this.loadingUser = false
        this.router.navigateByUrl('tabs/status');
      } else {
        this.loadingUser = false
      }
    })
  }

  login() {
    this.loginService.login()
  }


}
