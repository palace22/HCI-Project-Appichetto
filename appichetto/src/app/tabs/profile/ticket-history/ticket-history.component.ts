import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { RetrieveTicketService } from 'src/app/services/retrieve-ticket.service';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss'],
})
export class TicketHistoryComponent implements OnInit {

  ticketHistory: Ticket[]

  constructor(private retrieveTicketService: RetrieveTicketService) { }

  ngOnInit() {
    this.ticketHistory = this.retrieveTicketService.getTickets()
  }

}
