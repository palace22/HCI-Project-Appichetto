import { Injectable } from '@angular/core';
import { Ticket, DebtTicket } from '../models/ticket';
import { TicketRepositoryService } from '../repositories/ticket-repository.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { UserFriendsService } from './user-friends.service';
import { first, takeLast } from 'rxjs/operators';
import { UserFriends } from '../models/user-friends';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private ticketRepositoryService: TicketRepositoryService,
    private loginService: LoginService,
    private userFriendsService: UserFriendsService,
  ) { }

  private initializeDebtTickets(ticket: Ticket): Map<string, DebtTicket> {
    let debtTicket: Map<string, DebtTicket> = new Map<string, DebtTicket>()

    ticket.participants.forEach(participant => debtTicket.set(participant.email, {
      id: ticket.id,
      timestamp: ticket.timestamp,
      owner: ticket.owner,
      market: ticket.market,
      participant: participant,
      products: [],
      totalPrice: 0,
      paidPrice: 0,
    }))

    return debtTicket
  }

  private split(ticket: Ticket, debtTicket: Map<string, DebtTicket>) {
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
    let debtTickets: Map<string, DebtTicket> = this.initializeDebtTickets(ticket)
    debtTickets = this.split(ticket, debtTickets)

    this.ticketRepositoryService.saveOwnerTicket(ticket)

    debtTickets.forEach(debtTicket => {
      this.ticketRepositoryService.saveDebtTicket(debtTicket)
    })
  }

  getTicketsOfLoggedUser(): Promise<Observable<Ticket[]>> {
    return this.loginService.getLoggedUser()
      .then(loggedUser => {
        return this.ticketRepositoryService.getActiveTicketsOf(loggedUser)
      })
  }

  getDebtTicketsOf(user: User): Promise<Observable<DebtTicket[]>> {
    return this.loginService.getLoggedUser()
      .then(loggedUser => {
        return this.ticketRepositoryService.getDebtTicketsOf(user, loggedUser)
      })
  }

  getCreditTicketsTowards(user: User): Promise<Observable<DebtTicket[]>> {
    return this.loginService.getLoggedUser()
      .then(loggedUser => {
        return this.ticketRepositoryService.getDebtTicketsOf(loggedUser, user)
      })
  }

  async getPaidTicketsOfLoggedUser(): Promise<DebtTicket[]> {
    let loggedUser: User = await this.loginService.getLoggedUser()
    let loggedUserFriends: UserFriends = await this.userFriendsService.getUserFriends(loggedUser.email).pipe(first()).toPromise()
    return await Promise.all(
      loggedUserFriends.friends.map(
        async friend => {
          return await this.ticketRepositoryService.getDebtTicketsOf(friend, loggedUser).pipe(first()).toPromise()//TODO getPaidDebtTicketsOf(loggedUser, friend)
        })).then(paidTicketFriend => {
          return [].concat.apply([], paidTicketFriend) as DebtTicket[]
        })
  }
}
