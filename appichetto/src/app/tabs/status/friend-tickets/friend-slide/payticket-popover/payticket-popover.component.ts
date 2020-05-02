import { Component, OnInit } from '@angular/core';
import {NavParams, PopoverController} from '@ionic/angular';
import {DebtTicket} from '../../../../../models/ticket';
import {User} from '../../../../../models/user';
import {TicketService} from '../../../../../services/ticket.service';

@Component({
  selector: 'app-payticket-popover',
  templateUrl: './payticket-popover.component.html',
  styleUrls: ['./payticket-popover.component.scss'],
})
export class PayticketPopoverComponent implements OnInit {

  showSpinner = false;
  showSuccess = false;

  debtSelected: boolean;

  private ticket: DebtTicket;
  private friend: User;

  constructor(private navParams: NavParams, private popoverController: PopoverController, private ticketService: TicketService) {
    this.ticket = navParams.get('ticket');
    this.friend = navParams.get('friend');
    this.debtSelected = navParams.get('debtSelected');

    console.log(this.showSpinner, this.showSuccess, (!this.showSpinner && !this.showSuccess));
  }

  ngOnInit() {}

  pay() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.showSuccess = true;
      this.ticketService.paySingleDebtTicket(this.ticket);
    }, 1000);

  }
}
