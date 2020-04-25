import { Pipe, PipeTransform } from '@angular/core';
import { Ticket } from '../models/ticket';

@Pipe({
  name: 'firebaseTicket'
})
export class FirebaseTicketPipe implements PipeTransform {

  transform(ticket: Ticket): any {
    const firebaseTicket = {
      id: ticket.id,
      owner: ticket.owner,
      timestamp: ticket.timestamp,
      participants: ticket.participants.map((obj) => { return Object.assign({}, obj) }),
      products: ticket.products.map((obj) => { return Object.assign({}, obj) })
    }
    return firebaseTicket;
  }

}
