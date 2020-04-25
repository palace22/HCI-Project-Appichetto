import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user';
import {UserFriendsService} from 'src/app/services/user-friends.service';
import {DebtService} from '../../services/debt.service';
import {UserFriends} from 'src/app/models/user-friends';
import {Observable} from 'rxjs';
import {LoginService} from '../../services/login.service';


@Component({
    selector: 'app-status',
    templateUrl: './status.page.html',
    styleUrls: ['./status.page.scss'],
})

export class StatusPage implements OnInit {
    userFriendsObs: Observable<UserFriends>;
    userFriends: UserFriends;
    debts={};
    user: User;

    constructor(private userFriendsService: UserFriendsService, private debtService: DebtService, private loginService: LoginService) {
    }

     async ngOnInit() {
         this.user = {name: '', email: 'palazzolo1995@gmail.com'};// await this.loginService.getLoggedUser();
         this.userFriendsObs = this.userFriendsService.getUserFriends(this.user.email);
         this.userFriendsObs.subscribe( async userFriends => {
             this.userFriends = userFriends;
             this.userFriends.friends.forEach(user => this.debts[user.email] = this.getDebt(user));
             return this.debtService.getDebtWithUser(this.user);

         });
         // console.log(this.debts);
     }

    getDebt(user: User) {
        return this.debtService.getDebtWithUser(user);
    }
}
