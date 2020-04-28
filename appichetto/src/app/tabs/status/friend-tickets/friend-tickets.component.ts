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

    items = [];

    slideOpts = {
        initialSlide: 0,
        speed: 400,
    };
    private debtsSelected: boolean;

    constructor(private router: Router, private retrieveTicketService: RetrieveTicketService) {
        this.debtsSelected = true;
    }

    expandItem(item): void {
        if (item.expanded) {
            item.expanded = false;
        } else {
            this.items.map(listItem => {
                if (item === listItem) {
                    listItem.expanded = !listItem.expanded;
                } else {
                    listItem.expanded = false;
                }
                return listItem;
            });
        }
    }

    ngOnInit() {
        this.loggedUser = {name: 'PALAZZOLO', email: 'palazzolo1995@gmail.com'};// await this.loginService.getLoggedUser();
        this.friend = this.router.getCurrentNavigation().extras.state.friend;
        this.ticketsByFriend = this.retrieveTicketService.getTicketBoughtByWithParticipant(this.friend, this.loggedUser);
        this.ticketsByUser = this.retrieveTicketService.getTicketBoughtByWithParticipant(this.loggedUser, this.friend);

        this.ticketsByFriend.forEach(t => {
            this.items.push({ticket: t, expanded: false, debt:(Math.random()*10.0).toFixed(2)});
        });
    }

    segmentChanged(ev: any) {
        if(ev.detail.valueOf().value === 'debts'){
            this.debtsSelected = true;
        }
        else{
            this.debtsSelected = false;
        }
    }
}
