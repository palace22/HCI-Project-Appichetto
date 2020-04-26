import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {Router} from '@angular/router';
import {Ticket} from '../../../models/ticket';
import {RetrieveTicketService} from '../../../services/retrieve-ticket.service';

@Component({
    selector: 'app-friend-tickets',
    templateUrl: './friend-tickets.component.html',
    styleUrls: ['./friend-tickets.component.scss'],
})
export class FriendTicketsComponent implements OnInit {

    loggedUser: User;
    friend: User;
    ticketsByFriend: Ticket[];
    ticketsByUser: Ticket[];

    constructor(private router: Router, private retrieveTicketService: RetrieveTicketService) {
    }

    ngOnInit() {
        this.loggedUser = {name: '', email: 'palazzolo1995@gmail.com'};// await this.loginService.getLoggedUser();
        this.friend = this.router.getCurrentNavigation().extras.state.friend;
        this.ticketsByFriend = this.retrieveTicketService.getTicketBoughtByWithParticipant(this.friend, this.loggedUser)
        this.ticketsByUser = this.retrieveTicketService.getTicketBoughtByWithParticipant(this.loggedUser, this.friend)
    }

}
