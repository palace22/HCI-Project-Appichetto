import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss'],
})
export class TicketHistoryComponent implements OnInit {

  ticketHistoryObs: Observable<Ticket[]>
  ticketHistory: Ticket[]

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private loginService: LoginService,
  ) { }

  async ngOnInit() {
    let loggedUser: User = await this.loginService.getLoggedUser()
    this.ticketHistoryObs = this.ticketService.getTicketOf(loggedUser)
    this.ticketHistoryObs.subscribe(ticketHistory => this.ticketHistory = ticketHistory)
  }

  viewTicket(ticket: Ticket) {
    console.log(ticket)
    this.router.navigateByUrl("tabs/profile/show-ticket", { state: { ticket: ticket } });
  }

}
