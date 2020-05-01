import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loadingUser: boolean = false

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginService.getLoadingUser().subscribe(isLoading => {
      this.loadingUser = isLoading
      console.log(isLoading)
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
