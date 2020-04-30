import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from 'src/app/models/user';
import {UserFriendsService} from 'src/app/services/user-friends.service';
import {AccountingService} from '../../services/accounting.service';
import {UserFriends} from 'src/app/models/user-friends';
import {Observable} from 'rxjs';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {IonSlides} from '@ionic/angular';
import {TicketService} from '../../services/ticket.service';


@Component({
    selector: 'app-status',
    templateUrl: './status.page.html',
    styleUrls: ['./status.page.scss'],
})

export class StatusPage implements OnInit {
    userFriendsObs: Observable<UserFriends>;
    userFriends: UserFriends;
    debts = {};
    credits = {};
    noFriends = false;
    user: User;


    constructor(private userFriendsService: UserFriendsService, private ticketService: TicketService, private loginService: LoginService, private router: Router) {
    }

    async ngOnInit() {
        // federico.vaccaro@stud.unifi.it
        // palazzolo1995@gmail.com
        // this.user = {name: 'PALAZZOLO', email: 'palazzolo1995@gmail.com'};// await this.loginService.getLoggedUser();
        this.user = await this.loginService.getLoggedUser();
        this.userFriendsObs = this.userFriendsService.getUserFriends(this.user.email);
        this.userFriendsObs.subscribe(async userFriends => {
            if (userFriends !== undefined) {
                this.userFriends = userFriends;
                for (const user of this.userFriends.friends) {

                    this.debts[user.email] = 0.0;
                    this.credits[user.email] = 0.0;

                    const ticketsByFriendObs = await this.ticketService.getDebtTicketsOf(user);
                    ticketsByFriendObs.subscribe(tArr => {
                        tArr.forEach(t => this.debts[user.email] += (t.totalPrice - t.paidPrice));
                    });

                    const ticketsByMeObs = await this.ticketService.getCreditTicketsFrom(user);
                    ticketsByMeObs.subscribe(tArr => {
                        tArr.forEach(t => this.credits[user.email] += (t.totalPrice - t.paidPrice));
                    });
                }
                this.noFriends = this.userFriends.friends.length === 0;
            }
        });
    }

    goToFriendTicket(index) {
        this.router.navigateByUrl('tabs/status/friend-tickets', {state: {friendIndex: index}});
    }
}
