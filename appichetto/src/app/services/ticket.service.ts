import { Injectable } from '@angular/core';
import { Ticket, DebtTicket } from '../models/ticket';
import { TicketRepositoryService } from '../repositories/ticket-repository.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private ticketRepositoryService: TicketRepositoryService
  ) { }

  initializeDebtTickets(ticket: Ticket): Map<string, DebtTicket> {
    let debtTicket: Map<string, DebtTicket> = new Map<string, DebtTicket>()

    ticket.participants.forEach(participant => debtTicket.set(participant.email, {
      id: ticket.id,
      timestamp: ticket.timestamp,
      owner: ticket.owner,
      market: ticket.market,
      participant: participant,
      products: [],
      totalPrice: 0
    }))

    return debtTicket
  }

  split(ticket: Ticket, debtTicket: Map<string, DebtTicket>) {
    ticket.products.forEach(product => {
      let participantPrice = product.price / product.participants.length

      product.participants.forEach(participant => {
        let participantDebtTicket: DebtTicket = debtTicket.get(participant.email)
        participantDebtTicket.products.push({
          name: product.name,
          price: participantPrice,
          quantity: product.quantity,
        })
        participantDebtTicket.totalPrice += product.quantity * participantPrice
      })
    })
    return debtTicket
  }

  save(ticket: Ticket) {
    let debtTicket: Map<string, DebtTicket> = this.initializeDebtTickets(ticket)
    debtTicket = this.split(ticket, debtTicket)

    this.ticketRepositoryService.saveOwnerTicket(ticket)

    debtTicket.forEach(debtTicket =>
      this.ticketRepositoryService.saveDebtTicket(debtTicket)
    )
  }

  getTicketOf(user: User) {
    return this.ticketRepositoryService.getActiveTicketsOf(user)
  }
}
