import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user';
import {DebtTicket, Ticket} from '../../../../models/ticket';
import {RetrieveTicketService} from '../../../../services/retrieve-ticket.service';
import {TicketService} from '../../../../services/ticket.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Subject} from 'rxjs';

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

    ticketsByMeObs: Observable<DebtTicket[]>;
    ticketsByMe: DebtTicket[];

    debtCreditTotalSubject: BehaviorSubject<any>;

    selectedTicketTimestamp: number;

    private debtsSelected: boolean;

    @Input()
    private loggedUser: User;
    private debt = 0.0;
    private credit = 0.0;

    constructor(private ticketService: TicketService) {
        this.debtsSelected = true;
        this.debtCreditTotalSubject = new BehaviorSubject<any>({debt: 0.0, credit: 0.0, total: 0.0});
    }

    async ngOnInit() {

        // this.ticketsByFriend = this.ticketService.getTicketBoughtByWithParticipant(this.friend, this.loggedUser);
        this.ticketsByFriendObs = await this.ticketService.getDebtTicketsOf(this.friend);
        this.ticketsByFriendObs.subscribe(tArr => {
            this.ticketsByFriend = tArr;
            this.debt = 0.0;
            this.ticketsByFriend.forEach(t => this.debt += (t.totalPrice - t.paidPrice));
            this.debtCreditTotalSubject.next({debt: this.debt, credit: this.credit, total: this.credit - this.debt});
        });

        this.ticketsByMeObs = await this.ticketService.getCreditTicketsFrom(this.friend);
        this.ticketsByMeObs.subscribe(tArr => {
            this.ticketsByMe = tArr;
            this.credit = 0.0;
            this.ticketsByMe.forEach(t => this.credit += (t.totalPrice - t.paidPrice));
            this.debtCreditTotalSubject.next({debt: this.debt, credit: this.credit, total: this.credit - this.debt});
        });


    }

    getFriend() {
        return this.friend;
    }

    selectTicket(ticket: DebtTicket) {
        if (this.selectedTicketTimestamp === ticket.timestamp) {
            this.selectedTicketTimestamp = 0;
        } else {
            this.selectedTicketTimestamp = ticket.timestamp;
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
