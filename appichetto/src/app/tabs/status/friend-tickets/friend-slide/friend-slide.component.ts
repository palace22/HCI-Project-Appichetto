import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user';
import {Ticket} from '../../../../models/ticket';
import {RetrieveTicketService} from '../../../../services/retrieve-ticket.service';

@Component({
    selector: 'app-friend-slide',
    templateUrl: './friend-slide.component.html',
    styleUrls: ['./friend-slide.component.scss'],
})
export class FriendSlideComponent implements OnInit {
    @Input()
    private friend: User;

    ticketsByFriend: Ticket[];
    ticketsByUser: Ticket[];

    private debtsSelected: boolean;
    private items = [];

    @Input()
    private loggedUser: User;

    constructor(private retrieveTicketService: RetrieveTicketService) {
        this.debtsSelected = true;
    }

    async ngOnInit() {

        this.ticketsByFriend = this.retrieveTicketService.getTicketBoughtByWithParticipant(this.friend, this.loggedUser);
        this.ticketsByUser = this.retrieveTicketService.getTicketBoughtByWithParticipant(this.loggedUser, this.friend);

        console.log(this.ticketsByFriend);

        this.ticketsByFriend.forEach(t => {
            this.items.push({
                ticket: t,
                expanded: false,
                debt: (Math.random() * 10.0).toFixed(2),
                credit: (Math.random() * 10.0).toFixed(2)
            });
        });
    }

    getFriendName() {
        return this.friend.name;
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

    segmentChanged(ev: any) {
        if (ev.detail.valueOf().value === 'debts') {
            this.debtsSelected = true;
        } else {
            this.debtsSelected = false;
        }
    }


}
