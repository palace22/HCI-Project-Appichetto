import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user';
import {DebtTicket, Ticket} from '../../../../models/ticket';
import {RetrieveTicketService} from '../../../../services/retrieve-ticket.service';
import {TicketService} from '../../../../services/ticket.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-friend-slide',
    templateUrl: './friend-slide.component.html',
    styleUrls: ['./friend-slide.component.scss'],
})
export class FriendSlideComponent implements OnInit {
    @Input()
    private friend: User;


    ticketsByFriendObs: Observable<DebtTicket[]>;
    ticketsByFriend: DebtTicket[];

    debt: number;
    credit: number;
    selectedTicketTimestamp: number;

    private debtsSelected: boolean;
    private items = [];

    @Input()
    private loggedUser: User;

    constructor(private ticketService: TicketService) {
        this.debtsSelected = true;
    }

    async ngOnInit() {

        // this.ticketsByFriend = this.ticketService.getTicketBoughtByWithParticipant(this.friend, this.loggedUser);
        this.ticketsByFriendObs = await this.ticketService.getDebtTicketsOf(this.friend);
        this.ticketsByFriendObs.subscribe(t => {
            this.ticketsByFriend = t;
            console.log(this.ticketsByFriend)
        });

        this.debt = 0.0;
        //this.ticketsByFriend.forEach(t => this.debt += t.totalPrice);

        this.credit = Math.random() * 10;

        console.log(this.debt);
        console.log(this.credit);
    }

    getFriendName() {
        return this.friend.name;
    }

    selectTicket(ticket: DebtTicket) {
        if (this.selectedTicketTimestamp === ticket.timestamp) {
            this.selectedTicketTimestamp = 0;
        } else {
            this.selectedTicketTimestamp = ticket.timestamp;
        }
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
