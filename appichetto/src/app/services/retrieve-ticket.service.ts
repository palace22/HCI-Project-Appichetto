import { Injectable } from '@angular/core';
import { Ticket, TicketFirebase } from '../models/ticket';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { environment } from 'src/environments/environment';
import { FirebaseTicketPipe } from '../pipe/firebase-ticket.pipe';

@Injectable({
  providedIn: 'root'
})
export class RetrieveTicketService {
  ticketCollection: AngularFirestoreCollection<Ticket>

  constructor(
    private firestore: AngularFirestore,
    private firebaseTicketPipe: FirebaseTicketPipe,
  ) {
    this.ticketCollection = this.firestore.collection(environment.firebaseDB.ticket_history) as AngularFirestoreCollection<Ticket>

  }

  saveTicket(ticket: Ticket) {
    const firebaseTicket = this.firebaseTicketPipe.transform(ticket)
    this.ticketCollection.doc(ticket.owner.name).collection("my-ticket").doc(ticket.timestamp.toString()).set(firebaseTicket)
  }
}
