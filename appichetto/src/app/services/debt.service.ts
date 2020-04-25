import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class DebtService {

    constructor() {
    }

    getDebtWithUser(friend: User) {

        // stub method

        const creditValue = Math.random() * 10.0;
        const debtValue = Math.random() * 10.0;
        return {user: friend, credit: creditValue.toFixed(2), debt: debtValue.toFixed(2), total: (creditValue - debtValue).toFixed(2)};
    }
}
