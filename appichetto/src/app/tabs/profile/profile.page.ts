import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { TicketService } from 'src/app/services/ticket.service';

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

  constructor(private router: Router, private loginService: LoginService, private ticketService: TicketService) { }

  async ngOnInit() {
    try {
      this.user = await this.loginService.getLoggedUser()
    } catch (error) {
    }
  }

  logout() {
    this.loginService.logout()
  }

  goToAddFriends() {
    this.router.navigateByUrl('tabs/profile/friends-list')
  }

  goToTicketHistory() {
    this.router.navigateByUrl('tabs/profile/ticket-history')
  }

  goToMyTicket() {
    this.router.navigateByUrl('tabs/profile/my-ticket')
  }

  goToPaidTicket() {
    this.router.navigateByUrl('tabs/profile/paid-ticket')
  }

  test() {
    this.ticketService.getPaidTicketsOfLoggedUser()
  }
}
